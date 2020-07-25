import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsComponent } from './animals.component';

import { By } from 'protractor';

let component: AnimalsComponent;

describe('AnimalsComponent', () => {
  let fixture: ComponentFixture<AnimalsComponent>;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spy = spyOn(component, 'getAnimals').and.returnValues(animals);
  });

  it('should return a collection of animals', () => {
    expect(component).toBeTruthy();
  });


  it('should bind an input to a property (async)', async(() => {
    fixture.detectChanges();

    // Update the title input
    const inputElement = fixture.debugElement.query(By.scss('input[name="0"]')).nativeElement;
    inputElement.value = 'cow';
    inputElement.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(inputElement.value).toEqual('cow');
    });
  }));


  const animals = component.getAnimals();

    it('should return an array of animals', () => {
        let response;

        animals.subscribe(res => {
            response = res;
        });

        expect(response).toEqual(animals);
    });

    it('should call getAnimals one time and update the view', () => {
      expect(spy).toHaveBeenCalled();
      expect(spy.call.animals.length).toEqual(5);
    });


    it('should increment an input if the array has elements', () => {
        expect(animals).toContain({
            type: 'lamb',
            sound: 'baa',
            image: '../../assets/images/lamb.png'
        });
    });
});
