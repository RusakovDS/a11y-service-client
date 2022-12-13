import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw line chart', () => {
    component.data = [{timestamp: new Date(Date.now()), violatedRules: 10 }];
    component.createChart();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('svg')).not.toBeNull();
  });

  it('should not draw line chart', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('svg')).toBeNull();
  });
});
