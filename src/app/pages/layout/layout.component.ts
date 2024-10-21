import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogicAppService } from '../../services/logic-app.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, HttpClientModule, RouterModule],
  providers: [LogicAppService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  logicAppService = inject(LogicAppService);
  currentCustomer?: ICustomer;

  ngOnInit(): void {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }
  logout() {}
}
