import { Injectable } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClient } from '@angular/common/http';

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
    'Jovial',
    'Keen',
    'Lucky',
    'Mad',
    'Nervous',
    'Old',
    'Popular',
    'Quixotic',
    'Responsible',
    'Strong',
    'Traditional',
    'Unhappy',
    'Vicious',
    'Weak',
    'Xeric',
    'Young',
    'Zealous',
  ];

  usersAdjective: string;

  constructor(private http: HttpClient) { }

  getFirstLetter(userInput: string) {
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + userInput.toLowerCase()).subscribe(next => {
      userInput = next.name;
    }, (failure) => {
      alert('There seems to be a problem, try again later');
    }, () => {
      for (let index = 0; index < this.Adjectives.length; index++) {
        if (userInput === undefined || userInput === '') {
          alert('Users input cannot be blank');
          break;
        }
        if (this.Adjectives[index].substring(0, 1) === userInput.toUpperCase().substring(0, 1)) {
          this.usersAdjective = this.Adjectives[index];
          alert(this.usersAdjective + ' ' + userInput);
          break;
        } else {
          console.log('Nope ' + this.Adjectives[index] + ' does not = ' + userInput);
        }
      }
    });
  }

}
