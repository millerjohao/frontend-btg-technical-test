import { TestBed } from '@angular/core/testing';

import { LogicAppService } from './logic-app.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('LogicAppService', () => {
  let service: LogicAppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogicAppService],
    });
    service = TestBed.inject(LogicAppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a customer and set customer data to localStorage', () => {
    const password = 'testPassword';
    const mockResponse = { id: 1, name: 'John Doe' };

    service.login(password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('currentCustomer')).toEqual(
        JSON.stringify(mockResponse)
      );
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/customers/${password}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve customer from localStorage', () => {
    const mockCustomer = { id: 1, name: 'John Doe' };
    localStorage.setItem('currentCustomer', JSON.stringify(mockCustomer));

    const customer = service.getCustomerFromLocalStorage();
    expect(customer).toEqual(mockCustomer);
  });

  it('should return an observable of customer funds', () => {
    const customerId = 1;
    const mockFunds = [
      { id: 1, name: 'Fund A' },
      { id: 2, name: 'Fund B' },
    ];

    service.getCustomerFunds(customerId).subscribe((funds) => {
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/funds/byUser/${customerId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFunds);
  });

  it('should create an affiliation', () => {
    const requestBody = { customerId: 1, fundId: 2 };
    const mockResponse = { success: true };

    service.createAfiliation(requestBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/transactions/subscribe-to-fund'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestBody);
    req.flush(mockResponse);
  });

  it('should cancel an affiliation', () => {
    const customerId = 1;
    const fundId = 2;
    const mockResponse = { success: true };

    service.cancelAfiliation(customerId, fundId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:8080/api/transactions/cancel-subscription?customerId=${customerId}&fundId=${fundId}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return customer as an observable', (done) => {
    const mockCustomer = { id: '1', name: 'Test Customer' };

    service.setCustomerToLocalStorage(mockCustomer);

    service.customer.subscribe((customer) => {
      expect(customer).toEqual(mockCustomer);
      done();
    });
  });

  it('should fetch all funds', () => {
    const mockFunds = [
      { id: 1, name: 'Fund A' },
      { id: 2, name: 'Fund B' },
    ];

    service.getAllFunds().subscribe((funds) => {
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/funds');
    expect(req.request.method).toEqual('GET');
    req.flush(mockFunds);
  });

  it('should return an empty object when there is no customer in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = service.getCustomerFromLocalStorage();

    expect(result).toEqual({});
  });
});
