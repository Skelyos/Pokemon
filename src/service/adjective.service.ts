import { Injectable } from '@angular/core';

@Injectable()
export class AdjectiveService {

  Adjectives: string[] = [
    'Amazing',
    'Bouncy',
    'Cold',
    'Dangerous',
    'Explosive',
    'Funny',
    'Giant',
    'Heavy',
    'Intelligent',
    'J',
    'K',
    'Lucky',
    'Mad',
    'Nervous',
    'Old',
    'Popular',
    'Q',
    'Responsible',
    'Strong',
    'Traditional',
    'Unhappy',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  usersAdjective: string;

  constructor() { }

  getFirstLetter(userInput: string) {
    for (let index = 0; index < this.Adjectives.length; index++) {
      if (this.Adjectives[index].substring(0, 1) === userInput.substring(0, 1)) {
        this.usersAdjective = this.Adjectives[index];
        alert(this.usersAdjective);
      } else {
        console.log('Nope ' + this.Adjectives[index]);
      }
    }
  }
}
