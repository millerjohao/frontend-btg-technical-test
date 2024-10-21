import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsComponent } from './funds.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { LogicAppService } from '../../services/logic-app.service';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { ICustomer } from '../core/interfaces/customer-model.interface';

describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;
  let logicAppServiceSpy: jasmine.SpyObj<LogicAppService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const logicAppSpy = jasmine.createSpyObj('LogicAppService', [
      'getAllFunds',
      'getCustomerFunds',
      'cancelAfiliation',
      'login',
      'getCustomerFromLocalStorage',
    ]);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

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
      imports: [FundsComponent],
      providers: [
        { provide: LogicAppService, useValue: logicAppSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    logicAppServiceSpy = TestBed.inject(
      LogicAppService
    ) as jasmine.SpyObj<LogicAppService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
