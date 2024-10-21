import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsComponent } from './funds.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LogicAppService } from '../../services/logic-app.service';

describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;
  let logicAppService: jasmine.SpyObj<LogicAppService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const logicAppServiceSpy = jasmine.createSpyObj('LogicAppService', [
      'getAllFunds',
      'getCustomerFunds',
      'cancelAfiliation',
      'login',
      'getCustomerFromLocalStorage',
    ]);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [FundsComponent],
      providers: [
        { provide: LogicAppService, useValue: logicAppServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    logicAppService = TestBed.inject(
      LogicAppService
    ) as jasmine.SpyObj<LogicAppService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
