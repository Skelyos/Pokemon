import { Injectable } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  rndPokemon: string;

  constructor(private http: HttpClient, private router: Router) { }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  makePokemonArray() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/?limit=975').subscribe(next => {
      this.pokemonArray = next.results;
    }, (failure) => {
      alert('There seems to be a problem ' + JSON.stringify(failure));
    }, () => {
      console.log(this.pokemonArray.length + ' pokemon loaded');
      });
  }

  searchPokemonArray(userInput: string) {
    this.pokemonFilteredArray = [];
    for (let index = 0; index < this.pokemonArray.length; index++) {
      if (this.pokemonArray[index].name.substring(0, 1) === userInput.toLowerCase().substring(0, 1)) {
        this.pokemonFilteredArray.push(this.pokemonArray[index].name);
        this.rndPokemon = this.pokemonFilteredArray[this.getRandomInt(this.pokemonFilteredArray.length)];
      }
    }
    return this.rndPokemon;
  }

  assignAdjective() {
    for (let searchIndex = 0; searchIndex < this.Adjectives.length; searchIndex++) {
      if (this.rndPokemon === undefined) {
        this.router.navigate(['/']);
        break;
      }
      if (this.Adjectives[searchIndex].substring(0, 1) === this.rndPokemon.toUpperCase().substring(0, 1)) {
        this.usersAdjective = this.Adjectives[searchIndex];
        return this.usersAdjective + ' ' + this.rndPokemon;
        break;
      } else {
        console.log('Nope ' + this.Adjectives[searchIndex] + ' does not = ' + this.rndPokemon);
      }
    }
  }

}
