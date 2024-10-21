import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmountDialogComponent } from './amount-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogicAppService } from '../../../services/logic-app.service';
import { of, throwError } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AmountDialogComponent', () => {
  let component: AmountDialogComponent;
  let fixture: ComponentFixture<AmountDialogComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AmountDialogComponent>>;
  let logicAppServiceMock: jasmine.SpyObj<LogicAppService>;

  const mockFund = { id: 1, minAmount: 100 };
  const mockCustomer = { id: 1 };

  const matDialogDataMock = {
    fund: { minAmount: 1000, id: 1 },
  };

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    logicAppServiceMock = jasmine.createSpyObj('LogicAppService', [
      'getCustomerFromLocalStorage',
      'createAfiliation',
    ]);
    logicAppServiceMock.getCustomerFromLocalStorage.and.returnValue({
      id: 'customer-id',
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AmountDialogComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        { provide: LogicAppService, useValue: logicAppServiceMock },
        DecimalPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    logicAppServiceMock = TestBed.inject(
      LogicAppService
    ) as jasmine.SpyObj<LogicAppService>;
    dialogRefMock = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AmountDialogComponent>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountDialogComponent);
    component = fixture.componentInstance;
    component.currentCustomer = { id: 1 } as any;
    fixture.detectChanges();
  });

  it('should create the AmountDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct amount from MAT_DIALOG_DATA', () => {
    expect(component.amount).toBe(matDialogDataMock.fund.minAmount);
  });

  it('should call formatAmount and update the amount correctly', () => {
    const event = { target: { value: '1,000' } } as unknown as Event;
    component.formatAmount(event);
    expect(component.amount).toBe(1000);
  });

  it('should show an error when amount is less than minAmount and not close the dialog', () => {
    component.amount = 500;
    component.confirmSubscription();
    expect(component.error).toBe(
      `El monto debe ser mayor o igual a ${matDialogDataMock.fund.minAmount}`
    );
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should call closeDialog and close the dialog', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should show error message and clear it after 3 seconds', (done) => {
    const errorMessage = 'Test error message';
    component.showError(errorMessage);

    expect(component.error).toBe(errorMessage);

    setTimeout(() => {
      expect(component.error).toBe('');
      done();
    }, 3000);
  });
});
