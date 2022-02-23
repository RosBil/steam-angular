import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { asyncScheduler, Observable, Subscription } from 'rxjs';
import { Game } from '../shared/interfaces/game.interface';
import { AuthService } from '../core/services/auth.service';
import { SearchService } from '../core/services/search.service';
import { ErrorMessage } from '../shared/interfaces/error.interface';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  label = 'Games';
  isErrorModalShown = false;
  checkedTags: string[] = [];
  message: string = '';
  isLoggedIn = false;
  error: ErrorMessage;
  subscription: Subscription = new Subscription();
  errorSubscription: Subscription = new Subscription();
  games$: Observable<Game[]>;

  constructor(
    private searchService: SearchService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchService.setDefaultFilters();
    this.isLoggedIn = this.auth.isUserLoggedIn();
    this.searchGame('');
    this.games$ = this.searchService.currentGames;    
    this.errorSubscription = this.route.data.subscribe((message) => {
      this.showErrorMessage(message['error']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchGame(name: string): void {
    this.searchService.setSearchPhrase(name);
    this.searchService.search();
  }

  showModal(): void {
    this.isErrorModalShown = true;
  }

  hideModal(): void {
    this.isErrorModalShown = false;
  }

  showErrorMessage(error: ErrorMessage): void {
    const redirectToGames = () => {
      this.hideModal();
      this.router.navigate(['games']);
    };
    if (error) {
      this.error = error;
      this.showModal();
      asyncScheduler.schedule(redirectToGames, 3000);
    }
  }
  
}