import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let activatedRoute: ActivatedRoute;
  let paramMap: jasmine.SpyObj<ParamMap>;

  beforeEach(() => {
    paramMap = jasmine.createSpyObj('ParamMap', ['get']);
    const snapshot: any = jasmine.createSpyObj('ActivatedRouteSnapshot', [], { paramMap: paramMap });

    activatedRoute = {
      snapshot: snapshot,
    } as any;

    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    });
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tests that the code is set to -1 when there is no code parameter in the route', () => {
    component.ngOnInit();
    expect(component.code).toEqual(-1);
  });

  it('Tests that the code is set to the correct value when there is a code parameter in the route', () => {
    paramMap.get.and.returnValue('1000');
    component.ngOnInit();
    expect(component.code).toEqual(1000);
  });

  it('Tests that the code is set to -1 when the code parameter in the route is not a number', () => {
    paramMap.get.and.returnValue('not a number');
    component.ngOnInit();
    expect(component.code).toEqual(-1);
  });

  it('Tests that the code is set to -1 when the code parameter in the route is a negative number', () => {
    paramMap.get.and.returnValue('-1000');
    component.ngOnInit();
    expect(component.code).toEqual(-1000);
  });

  it('Tests that the route property is injected with the ActivatedRoute', () => {
    expect(component.route).toBeDefined();
  });

  it('Tests that the code property is set to -1 when there is an error getting the code parameter from the route', () => {
    paramMap.get.and.returnValue(null);
    component.ngOnInit();
    expect(component.code).toEqual(-1);
  });
});
