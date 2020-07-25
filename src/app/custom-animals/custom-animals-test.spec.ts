import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CustomAnimalsComponent } from './custom-animals.component';

import { DebugElement } from '@angular/core';
import { By } from 'protractor';

let customComponent: CustomAnimalsComponent;

describe('CustomAnimalsComponent', () => {
  let fixture: ComponentFixture<CustomAnimalsComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAnimalsComponent);
    customComponent = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should return a list of animals', () => {
    expect(customComponent).toBeTruthy();
  });


  it('should have a H4 tag of `E-I-E-I-O`', () => {
    expect(de.query(By.scss('h4')).nativeElement.innerText).toBe('E-I-E-I-O');
  });


  it('should toggle the lyrics boolean', () => {
    expect(customComponent.showLyrics).toBeFalsy();
    customComponent.onSubmit();
    tick(500);
    expect(customComponent.showLyrics).toBeTruthy();

  });

});
