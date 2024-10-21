import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  logout() {}
}
