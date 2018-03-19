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
  pokemonArray: any;
  pokemonFilteredArray = [];

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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  makePokemonArray() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=850').subscribe(next => {
      this.pokemonArray = next.results;
    }, (failure) => {
      alert('There seems to be a problem');
    }, () => {
      // for (let index = 0; index < this.pokemonArray.length; index++) {
      //   console.log(this.pokemonArray[index].name);
      // }
      console.log(this.pokemonArray.length + ' pokemon loaded');
      });
    }



  searchPokemonArray(userInput: string) {
    this.pokemonFilteredArray = [];
    for (let index = 0; index < this.pokemonArray.length; index++) {
      if (this.pokemonArray[index].name.substring(0, 1) === userInput.toLowerCase().substring(0, 1)) {
        this.pokemonFilteredArray.push(this.pokemonArray[index].name);
        const rndPokemon = this.pokemonFilteredArray[this.getRandomInt(this.pokemonFilteredArray.length)];
      }
    }
    for (let searchIndex = 0; searchIndex < this.Adjectives.length; searchIndex++) {
      if (this.Adjectives[searchIndex].substring(0, 1) === rndPokemon.toUpperCase().substring(0, 1)) {
        this.usersAdjective = this.Adjectives[searchIndex];
        alert(this.usersAdjective + ' ' + rndPokemon);
        break;
      } else {
        console.log('Nope ' + this.Adjectives[index] + ' does not = ' + rndPokemon);
      }
    }
  }

}
