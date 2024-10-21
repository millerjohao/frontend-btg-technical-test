import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  UrlTree,
} from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LogicAppService } from '../../services/logic-app.service';
import { ICustomer } from '../core/interfaces/customer-model.interface';
import { of, Subject, Subscription } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { AmountDialogComponent } from '../components/amount-dialog/amount-dialog.component';
import { CommonModule } from '@angular/common';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let logicAppServiceSpy: jasmine.SpyObj<LogicAppService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCustomer: ICustomer = {
    id: 1,
    name: 'John Doe',
    balance: 1000,
  } as any;

  beforeEach(async () => {
    const logicAppSpy = jasmine.createSpyObj('LogicAppService', [
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
        LayoutComponent,
        CommonModule,
        RouterModule,
        HttpClientTestingModule,
        AmountDialogComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: LogicAppService, useValue: logicAppSpy },
        { provide: Router, useValue: routerSpyObj },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map<string, string>()),
            snapshot: {
              paramMap: {
                get: () => 'mockValue',
              },
            },
          },
        },
      ],
    }).compileComponents();

    logicAppServiceSpy = TestBed.inject(
      LogicAppService
    ) as jasmine.SpyObj<LogicAppService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    logicAppServiceSpy.getCustomerFromLocalStorage.and.returnValue(
      mockCustomer
    );
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout and navigate to login', () => {
    logicAppServiceSpy.logout.and.stub();

    component.logout();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
