import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlConnectionComponent } from './mysql-connection.component';

describe('MysqlConnectionComponent', () => {
  let component: MysqlConnectionComponent;
  let fixture: ComponentFixture<MysqlConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysqlConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysqlConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
