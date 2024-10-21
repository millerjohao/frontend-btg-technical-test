import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogicAppService } from '../../services/logic-app.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';
import { AmountDialogComponent } from '../components/amount-dialog/amount-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LogicAppService],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.scss',
})
export class FundsComponent implements OnInit {
  logicAppService = inject(LogicAppService);
  router = inject(Router);
  allFunds: any[] = [];
  availableFunds: any[] = [];
  subscribedFunds: any[] = [];
  currentCustomer: ICustomer;
  selectedFund: any;
  amount?: number;
  dialogRef = inject(MatDialog);

  constructor() {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds(): void {
    this.logicAppService.getAllFunds().subscribe((allFunds: any[]) => {
      this.allFunds = allFunds;

      this.logicAppService
        .getCustomerFunds(this.currentCustomer?.id)
        .subscribe((customerFunds: any[]) => {
          this.subscribedFunds = customerFunds;

          this.availableFunds = this.allFunds.filter(
            (fund) => !this.subscribedFunds.some((sub) => sub.id === fund.id)
          );
        });
    });
  }

  cancelAfiliation(fund: any): void {
    this.logicAppService
      .cancelAfiliation(this.currentCustomer.id, fund.id)
      .subscribe(() => {
        this.loadFunds();
        this.logicAppService
          .login(String(this.currentCustomer.id))
          .subscribe(() => {
            this.refresh();
          });
      });
  }

  openAmountDialog(fund: any): void {
    this.selectedFund = fund;
    this.amount = fund.minAmount;
    const dialog = this.dialogRef.open(AmountDialogComponent, {
      data: { fund: this.selectedFund },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.loadFunds();
        this.logicAppService
          .login(String(this.currentCustomer.id))
          .subscribe(() => {
            this.refresh();
          });
      }
    });
  }

  refresh() {
    location.reload();
  }
}
