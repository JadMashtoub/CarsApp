import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcarComponent } from './viewcar.component';

describe('ViewcarComponent', () => {
  let component: ViewcarComponent;
  let fixture: ComponentFixture<ViewcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
