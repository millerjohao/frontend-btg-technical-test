import { Component, inject } from '@angular/core';
import { LogicAppService } from '../../services/logic-app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { ICustomer } from '../core/interfaces/customer-model.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [LogicAppService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  logicAppService = inject(LogicAppService);
  currentCustomer?: ICustomer;

  ngOnInit(): void {
    this.currentCustomer = this.logicAppService.getCustomerFromLocalStorage();
  }
}
