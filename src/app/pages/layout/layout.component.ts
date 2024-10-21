import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogicAppService } from '../../services/logic-app.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LogicAppService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  logicAppService = inject(LogicAppService);
  currentCustomer?: ICustomer | any;
  router = inject(Router);  
  currentAmount: number;

  constructor() {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
    this.currentAmount = this.currentCustomer.balance;
  }
  ngOnInit(): void {}

  logout() {
    this.logicAppService.logout();
    this.router.navigate(['/login']);
  }
}
