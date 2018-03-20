import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonService {

  baseUrl: string = 'https://pokeapi.co/api/v2/';

  // http://pokeapi.co/api/v2/pokemon/1
  private pokemonSearch = new BehaviorSubject<string>('');
  Searched = this.pokemonSearch.asObservable();

  constructor(public http: HttpClient) { }

  searchPokemon(Searched) {
    return this.http.get(this.baseUrl + 'pokemon/' + Searched + '/');
  }

  searchWeakness(type) {
    return this.http.get(this.baseUrl + 'type/' + type + '/');
  }

}
