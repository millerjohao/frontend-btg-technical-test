import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LogicAppService } from '../../services/logic-app.service';
import { AmountDialogComponent } from '../components/amount-dialog/amount-dialog.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<AmountDialogComponent>>;
  let logicAppServiceMock: jasmine.SpyObj<LogicAppService>;
  const matDialogDataMock = {
    fund: { minAmount: 1000, id: 1 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistoryComponent,
        HttpClientTestingModule,
        AmountDialogComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
        { provide: LogicAppService, useValue: logicAppServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'mockedParam' 
              }
            },
            queryParamMap: of({}) 
          }
        },
        DecimalPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
