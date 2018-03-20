import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { AdjectiveService } from '../../service/adjective.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  imageIndex: number = 0;
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

  pokemonName: string;

  constructor(public PService: PokemonService, private route: ActivatedRoute, private adjective: AdjectiveService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.pokemonName !== undefined) {
        this.PService.searchPokemon(param.pokemonName).subscribe((returnValue) => {
          this.SearchPName = this.adjective.assignAdjective();
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
      } else {
        console.log('There is no peram in URL');
      }
    });
  }

  incrementSpriteIndex() {
    this.imageIndex++;
  }

}
