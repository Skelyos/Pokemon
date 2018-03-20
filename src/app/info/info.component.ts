import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjectiveService } from '../../service/adjective.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  imageIndex = 2;
  imgBtnText: String = 'Next Image';
  backBtn: String = 'Back';
  resultValue: string;
  Height: string;
  Weight: string;

  SearchPId: string;
  SearchPName: string;
  MoveList = [];
  SpritesList = [];
  Types = [];

  weaknessArray = [];

  pokemonName: string;

  constructor(
    public PService: PokemonService,
    private route: ActivatedRoute,
    private adjective: AdjectiveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.pokemonName !== undefined) {
        this.PService.searchPokemon(param.pokemonName).subscribe((returnValue) => {
          this.SearchPName = this.adjective.assignAdjective();
          this.MoveList = returnValue.moves;
          this.Types = returnValue.types;
          this.Height = returnValue.height + 'cm';
          this.Weight = returnValue.weight + 'kg';
          for (const sprite in returnValue.sprites) {
            if (returnValue.sprites[sprite] != null) {
              this.SpritesList.push(returnValue.sprites[sprite]);
            }
          }
          this.Types.forEach(type => {
            this.PService.searchWeakness(type.type.name).subscribe((returnType) => {
              for (let noD = 0; noD < returnType.damage_relations.no_damage_to.length; noD++) {
                this.weaknessArray.push(returnType.damage_relations.no_damage_to[noD].name);
              }
              for (let halfD = 0; halfD < returnType.damage_relations.half_damage_to.length; halfD++) {
                this.weaknessArray.push(returnType.damage_relations.half_damage_to[halfD].name);
              }
              for (let doubleD = 0; doubleD < returnType.damage_relations.double_damage_from.length; doubleD++) {
                this.weaknessArray.push(returnType.damage_relations.double_damage_from[doubleD].name);
              }
            });
          });
        });
      } else {
        console.log('There is no peram in URL');
        this.router.navigate(['/']);
      }
    });
  }

  incrementSpriteIndex() {
    this.imageIndex++;
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
