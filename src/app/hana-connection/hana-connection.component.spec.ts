import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanaConnectionComponent } from './hana-connection.component';

describe('HanaConnectionComponent', () => {
  let component: HanaConnectionComponent;
  let fixture: ComponentFixture<HanaConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanaConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanaConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
