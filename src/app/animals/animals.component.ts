import { Component } from '@angular/core';
import { of } from 'rxjs';

import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Animal } from '../models/animalsData.model';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent {


  form: FormGroup;
  minAnimalsValidator: Boolean = true; /* Checked animals validator */
  animalsData: Animal[] = []; /* Original array */
  selectedAnimals: Animal[] = []; /* Array from the selected animals */

  /* Images of the animals */
  cowImg: string = '../../assets/images/cow.png';
  pigImg: string = '../../assets/images/pig.png';
  duckImg: string = '../../assets/images/duck.png';
  horseImg: string = '../../assets/images/horse.png';
  lambImg: string = '../../assets/images/lamb.png';
  

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      animals: new FormArray([])
    });
    
    // Synchronous animals
    //this.animalsData = this.getAnimals();

    // async orders 
    of(this.getAnimals()).subscribe(animals => {
    this.animalsData = animals;

    this.addCheckboxes();
    });
  }


  /* Add animals to the array */
  getAnimals() {
    return [
      new Animal('cow', 'moo', this.cowImg),
      new Animal('pig', 'oink', this.pigImg),
      new Animal('duck', 'quack', this.duckImg),
      new Animal('horse', 'neigh', this.horseImg),
      new Animal('lamb', 'baa', this.lambImg)
    ]
  }


  get animalsFormArray() {
    return this.form.controls.animals as FormArray;
  }

  /* Add checkboxes with the animals from the array */
  private addCheckboxes() {
    this.animalsData.forEach(() => this.animalsFormArray.push(new FormControl(false)));
  }


  /* Render lyrics for each of the checked animals */
  getSelectedAnimals() {
    let lyrics = document.createElement('p');
    document.querySelector('.lyrics-holder').innerHTML = '';

    // loop through animals form array
    this.animalsFormArray.controls.forEach((control, i) => {
      if(control.value) {
        this.selectedAnimals.push(this.animalsData[i]); 
        
        // fill in the lyrics with the type and the sound of the selected animal
        lyrics.innerHTML = `
        Old MACDONALD had a farm <br>
        <h4>E-I-E-I-O</h4> 
        And on his farm he had a <span>${ this.animalsData[i].type }</span> <br>
        <h5>E-I-E-I-O</h5> 
        With a <span>${ this.animalsData[i].sound } ${ this.animalsData[i].sound }</span> here <br>
        And a <span>${ this.animalsData[i].sound } ${ this.animalsData[i].sound }</span> there <br>
        Here a <span>${ this.animalsData[i].sound }</span>, there a <span>${ this.animalsData[i].sound }</span> <br>
        Everywhere a <span>${ this.animalsData[i].sound } ${ this.animalsData[i].sound }</span> <br>
        Old MacDonald had a farm 
        <h6>E-I-E-I-O</h6>
        `;

        // display the lyrics 
        document.querySelector('.lyrics-holder').appendChild(lyrics);  
      }
    });

    // a user must check at least one animal
    this.minAnimalsValidator = this.selectedAnimals.length > 0 ? false : true;
  }
}