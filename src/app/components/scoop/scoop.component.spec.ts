import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoopComponent } from './scoop.component';

describe('ScoopComponent', () => {
  let component: ScoopComponent;
  let fixture: ComponentFixture<ScoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
