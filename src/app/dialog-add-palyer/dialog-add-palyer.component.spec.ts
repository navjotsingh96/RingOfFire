import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPalyerComponent } from './dialog-add-palyer.component';

describe('DialogAddPalyerComponent', () => {
  let component: DialogAddPalyerComponent;
  let fixture: ComponentFixture<DialogAddPalyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPalyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPalyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
