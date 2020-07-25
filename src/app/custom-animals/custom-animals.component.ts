import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomAnimal } from '../models/customAnimal.model';

@Component({
  selector: 'app-custom-animals',
  templateUrl: './custom-animals.component.html',
  styleUrls: ['./custom-animals.component.scss']
})
export class CustomAnimalsComponent {

  customAnimal: CustomAnimal;
  customForm: FormGroup;

  addedAnimalsList: CustomAnimal[] = []; /* Stored animals from SessionStorage  */
  animalType; /* store the type value and add it to the lyrics */
  animalSound; /* store the sound value and add it to the lyrics */
  showLyrics: Boolean = false; /* show the lyrics with if statement on submit */

  constructor(private formBuilder: FormBuilder) {

      this.customAnimal = new CustomAnimal();
      this.buildForm();
  }


  private buildForm(): void {
    this.customForm = this.formBuilder.group({
      type: [this.customAnimal.type, Validators.required],
      sound: [this.customAnimal.sound, Validators.required]
    });
  }


  onSubmit() {
    // save added animals in SessionStorage
    const data = this.customForm.value as CustomAnimal;
    
    // show the added animal 
    sessionStorage.setItem('addedAnimals', JSON.stringify(data));
    this.addedAnimalsList.push(data);
    
    this.animalType = `${data.type}`;
    this.animalSound = `${data.sound}`;

    // display the lyrics
    this.showLyrics = true;
  
    // empty form
    this.customForm.reset();

    // add the animals to a div
    this.addedAnimalsBox();
  }

 addedAnimalsBox() {
  // loop through added animals array
  let addedAnimalsBox = document.createElement('a');
  this.addedAnimalsList.forEach((addedAnimal) => {
    if(addedAnimal) {
      
      // add the animal to the box
      addedAnimalsBox.innerHTML = `
      ${ addedAnimal.type }: ${ addedAnimal.sound }
      `;

      // display the lyrics 
      document.querySelector('.added-animals').appendChild(addedAnimalsBox);  
    }
  });

  // if one of the added animals is clicked render the lyrics with animla's type and sound
  addedAnimalsBox.onclick = this.onRenderAnimal;
}

  onRenderAnimal(e) {
    let lyrics, addedType, addedSound;

    // get the type and sound of the clicked animal
    let clickedAnimal = e.target.text;
    addedType = clickedAnimal.split(':')[0];
    addedSound = clickedAnimal.split(':')[1];

    // render the lyrics for this animal
    lyrics = `
        Old MACDONALD had a farm <br>
        <h4>E-I-E-I-O</h4> 
        And on his farm he had a <span>${ addedType }</span> <br>
        <h5>E-I-E-I-O</h5> 
        With a <span>${ addedSound } ${ addedSound }</span> here <br>
        And a <span>${ addedSound } ${ addedSound }</span> there <br>
        Here a <span>${ addedSound }</span>, there a <span>${ addedSound }</span> <br>
        Everywhere a <span>${ addedSound } ${ addedSound }</span> <br>
        Old MacDonald had a farm 
        <h6>E-I-E-I-O</h6>
        `;

        // display the lyrics 
        document.querySelector('.lyrics-holder').innerHTML = lyrics;  
  }

}