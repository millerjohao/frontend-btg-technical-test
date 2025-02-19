import { Component, inject, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { LogicAppService } from '../../services/logic-app.service';
import { HttpClientModule } from '@angular/common/http';
import { ICustomer } from '../core/interfaces/customer-model.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LogicAppService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  logicAppService = inject(LogicAppService);
  currentCustomer?: ICustomer;

  ngOnInit(): void {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }
}
