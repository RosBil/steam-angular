import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() onClickEvent = new EventEmitter<string>();
  @Output() inputEvent = new EventEmitter<string>();
  @Input() label: string = '';

  constructor(
    private searchService: SearchService
  ) {}

  updateSearchPhrase(phrase: string) {
    this.searchService.setSearchPhrase(phrase);
  }

  search(value: string) {
    this.onClickEvent.emit(value);
  }

  fillField(value: string) {
    this.inputEvent.emit(value);
  }
}
