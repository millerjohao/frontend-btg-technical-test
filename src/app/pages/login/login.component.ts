import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogicAppService } from '../../services/logic-app.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [LogicAppService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  logicAppService = inject(LogicAppService);
  router = inject(Router);
  loginForm: FormGroup;
  errorMessage?: string;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { password } = this.loginForm.value;
      this.logicAppService.login(password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/home']);
        },
        error: () => {
          this.errorMessage = 'Credenciales inválidas';
          this.loading = false;
        },
      });
    }
  }
}
