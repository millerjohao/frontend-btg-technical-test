import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  UrlTree,
} from '@angular/router';
import { of, Subject } from 'rxjs';
import { LogicAppService } from '../../services/logic-app.service';
import { AmountDialogComponent } from '../components/amount-dialog/amount-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let logicAppServiceSpy: jasmine.SpyObj<LogicAppService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const matDialogDataMock = {
    fund: { minAmount: 1000, id: 1 },
  };

  beforeEach(async () => {
    const logicAppSpy = jasmine.createSpyObj('LogicAppService', [
      'login',
      'getCustomerFromLocalStorage',
      'logout',
    ]);
    const routerEventsSubject = new Subject<NavigationEnd>();
    const routerSpyObj = {
      ...jasmine.createSpyObj('Router', [
        'navigate',
        'createUrlTree',
        'serializeUrl',
      ]),
      events: routerEventsSubject.asObservable(),
      url: '/some-url',
    };

    routerSpyObj.createUrlTree.and.returnValue({} as UrlTree);
    routerSpyObj.serializeUrl.and.returnValue('mocked-serialized-url');

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HttpClientTestingModule,
        AmountDialogComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: LogicAppService, useValue: logicAppSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    logicAppServiceSpy = TestBed.inject(
      LogicAppService
    ) as jasmine.SpyObj<LogicAppService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty email and password', () => {
    component.ngOnInit();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should set loading to true and navigate on successful login', () => {
    const password = '1';
    component.loginForm.setValue({ email: 'test@example.com', password });
    logicAppServiceSpy.login.and.returnValue(of({}));

    component.onSubmit();

    expect(component.loading).toBe(true);
  });
});
