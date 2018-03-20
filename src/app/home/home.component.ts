import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonName: string;
  btnText: String = 'Search';
  imgBtnText: String = 'Next Image';
  resultValue: string;
  SearchPId: string;
  SearchPName: string;
  MoveList = [];
  SpritesList = [];
  Types = [];
  noDamageTo = [];
  halfDamageTo = [];
  doubleDamageTo = [];
  imageIndex: number = 0;

  constructor(public PService: PokemonService) { }

  ngOnInit() {
  }

  findPokemon() {
    this.PService.searchPokemon(this.pokemonName).subscribe((returnValue) => {
      this.SearchPId = returnValue.id;
      this.SearchPName = returnValue.name;
      this.MoveList = returnValue.moves;
      this.Types = returnValue.types;
      for (const sprite in returnValue.sprites) {
        if (returnValue.sprites[sprite] != null) {
          this.SpritesList.push(returnValue.sprites[sprite]);
        }
      }
      this.Types.forEach(type => {
        this.PService.searchWeakness(type.type.name).subscribe((returnType) => {
          const damageRelations = returnType['damage_relations'];
          if (damageRelations['no_damage_to'] != null) {
            this.noDamageTo.push(damageRelations['no_damage_to']);
          }
          debugger;
          if (damageRelations['half_damage_to'] != null) {
            this.halfDamageTo.push(damageRelations['half_damage_to']);
          }
          debugger;
          if(damageRelations['double_damage_from'] != null) {
            this.doubleDamageTo.push(damageRelations['double_damage_from']);
          }
          debugger;
        });
      });
    });
  }

  incrementSpriteIndex() {
    this.imageIndex++;
  }
}
