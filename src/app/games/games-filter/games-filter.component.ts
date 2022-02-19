import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-games-filter',
  templateUrl: './games-filter.component.html',
  styleUrls: ['./games-filter.component.css']
})
export class GamesFilterComponent {
  checkedTags: string[] = [];
  rangeValue = 2000;
  constructor(private searchService: SearchService) { }

  toggleTag(event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.searchService.addTag((event.target as HTMLInputElement).name);
    } else {
      this.searchService.removeTag((event.target as HTMLInputElement).name);
    }
    this.searchService.filterGames();
  }

  onRangeChange(value: string): void {
    this.rangeValue = +value;
    this.searchService.setPriceRange(this.rangeValue);
    this.searchService.filterGames();
  }
}
