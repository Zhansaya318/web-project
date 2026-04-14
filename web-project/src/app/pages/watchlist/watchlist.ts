import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Movie } from '../../models/movie';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  watchlistMovies: Movie[] = [];

  constructor(private watchlistService: WatchlistService) {
    this.watchlistMovies = this.watchlistService.getWatchlistMovies();
  }

  removeMovie(movieId: number): void {
    this.watchlistService.removeFromWatchlist(movieId);
    this.watchlistMovies = this.watchlistService.getWatchlistMovies();
  }
}