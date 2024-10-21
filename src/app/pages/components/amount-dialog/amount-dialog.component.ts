import { Component, inject, Inject } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/modules/angular-material/angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogicAppService } from '../../../services/logic-app.service';
import { ICustomer } from '../../core/interfaces/customer-model.interface';

@Component({
  selector: 'app-amount-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [LogicAppService, DecimalPipe],
  templateUrl: './amount-dialog.component.html',
  styleUrl: './amount-dialog.component.scss',
})
export class AmountDialogComponent {
  amount: number = 0;
  logicAppService = inject(LogicAppService);
  currentCustomer?: ICustomer;
  error?: string;

  constructor(
    private decimalPipe: DecimalPipe,
    public dialogRef: MatDialogRef<AmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.amount = data.fund.minAmount;
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }

  formatAmount(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const cleanValue = inputElement.value.replace(/,/g, '');
    this.amount = Number(cleanValue);
  }

  confirmSubscription(): void {
    if (this.amount >= this.data.fund.minAmount) {
      const requestBody = {
        idCustomer: this.currentCustomer?.id,
        idFund: this.data.fund.id,
        amount: this.amount,
      };
      this.logicAppService.createAfiliation(requestBody).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.showError(err.error.message);
        },
      });
    } else {
      this.showError(
        `El monto debe ser mayor o igual a ${this.data.fund.minAmount}`
      );
    }
  }
  showError(error: string) {
    this.error = error;
    setTimeout(() => {
      this.error = '';
    }, 3000);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
