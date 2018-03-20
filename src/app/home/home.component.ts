import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Observable } from 'rxjs/Observable';
import { AdjectiveService } from '../../service/adjective.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokeLetter: string;
  pokemonName: string;
  textBoxTxt = 'Choose your letter...';
  btnText: String = 'Generate name';

  constructor(public Adjective: AdjectiveService, private router: Router) { }

  ngOnInit() {
    this.Adjective.makePokemonArray();
  }

  findPokemon() {
    this.router.navigate(['info', {pokemonName: this.Adjective.returnRandomPokemon(this.pokeLetter)}]);
  }

}
