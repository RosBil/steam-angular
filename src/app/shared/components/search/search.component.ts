import { Component, OnInit } from '@angular/core';
import { GamesServices } from '../../services/game.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService, 
    private gamesService: GamesServices) { }
    searchGame(): void {        
      this.searchService.search();
    }
    updateSearchPhrase(phrase: string) {
      this.searchService.setSearchPhrase(phrase);
      console.log(this.searchService.getSearchPhrase());
    }
  ngOnInit(): void {

  }

}
