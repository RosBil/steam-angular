import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesServices } from '../../../core/services/game.service';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() onClickEvent = new EventEmitter<string>();
  @Output() inputEvent = new EventEmitter<string>();
  @Input() label: string = '';

  constructor(
    private searchService: SearchService,
    private gamesService: GamesServices
  ) {}

  updateSearchPhrase(phrase: string) {
    this.searchService.setSearchPhrase(phrase);
    console.log(this.searchService.getSearchPhrase());
  }

  search(value: string) {
    this.onClickEvent.emit(value);
  }

  fillField(value: string) {
    this.inputEvent.emit(value);
  }

  ngOnInit(): void {}
}
