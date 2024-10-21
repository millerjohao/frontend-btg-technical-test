import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogicAppService } from '../../services/logic-app.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';

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
  allFunds: any[] = [];
  availableFunds: any[] = [];
  subscribedFunds: any[] = [];
  currentCustomer?: ICustomer;

  ngOnInit(): void {
    this.loadFunds();
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
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

  subscribeToFund(fund: any): void {}

  unsubscribeFromFund(fund: any): void {}
}
