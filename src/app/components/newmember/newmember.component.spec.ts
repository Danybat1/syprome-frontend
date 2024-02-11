import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmemberComponent } from './newmember.component';

describe('NewmemberComponent', () => {
  let component: NewmemberComponent;
  let fixture: ComponentFixture<NewmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewmemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
