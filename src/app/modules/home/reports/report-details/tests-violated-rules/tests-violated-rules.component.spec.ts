import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsViolatedRulesComponent } from './tests-violated-rules.component';

describe('TestsViolatedRulesComponent', () => {
  let component: TestsViolatedRulesComponent;
  let fixture: ComponentFixture<TestsViolatedRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsViolatedRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsViolatedRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
