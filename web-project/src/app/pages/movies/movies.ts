import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {
    this.movies = this.movieService.getMovies();
  }

  addToWatchlist(movieId: number): void {
    this.watchlistService.addToWatchlist(movieId);
  }
}