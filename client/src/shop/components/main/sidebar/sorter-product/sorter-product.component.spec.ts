import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterProductComponent } from './sorter-product.component';

describe('SorterProductComponent', () => {
  let component: SorterProductComponent;
  let fixture: ComponentFixture<SorterProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorterProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
