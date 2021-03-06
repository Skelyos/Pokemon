import { Component, OnInit } from '@angular/core';
import { AdjectiveService } from '../../service/adjective.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  UserInput: string;

  constructor(private adjectiveService: AdjectiveService) { }

  ngOnInit() {
    this.adjectiveService.makePokemonArray();
  }

  searchAdjective() {
    this.adjectiveService.searchPokemonArray(this.UserInput);
  }
}
