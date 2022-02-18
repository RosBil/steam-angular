import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-games-filter',
  templateUrl: './games-filter.component.html',
  styleUrls: ['./games-filter.component.css']
})
export class GamesFilterComponent implements OnInit {
  checkedTags: string[] = [];
  rangeValue = 2000;
  constructor(private searchService: SearchService) { }

  getCheckedTags(): void {
    this.checkedTags = [];

    document.querySelectorAll(('input[class=tag-filter_item--checkbox]:checked')).forEach(
      inputEl => this.checkedTags.push(inputEl.id)
    );
    this.searchService.setTags(this.checkedTags);
    console.log(`Tags in searchService: ${this.searchService.getTags().join()}`)
    console.log(this.checkedTags);
  }
  onRangeChange(value: string): void {
    this.rangeValue = +value;
    this.searchService.setPriceRange(this.rangeValue);
    console.log(this.searchService.getPriceRange());
  }
  ngOnInit(): void {
  }

    
  // getCheckedTags(): void {
  //   this.checkedTags = [];
  //   document
  //     .querySelectorAll('input[class=tag-filter_item--checkbox]:checked')
  //     .forEach((inputEl) => this.checkedTags.push(inputEl.id));
  //   this.searchService.setTags(this.checkedTags);
  //   console.log(this.checkedTags);
  // }

}
