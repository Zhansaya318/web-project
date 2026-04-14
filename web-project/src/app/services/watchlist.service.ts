import { Injectable } from '@angular/core';
import { WatchlistItem } from '../models/watchlist';
import { Movie } from '../models/movie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private watchlist: WatchlistItem[] = [
    { id: 1, userId: 1, movieId: 1 },
    { id: 2, userId: 1, movieId: 2 }
  ];

  constructor(private movieService: MovieService) {}

  getWatchlistMovies(): Movie[] {
    const movies = this.movieService.getMovies();

    return movies.filter(movie =>
      this.watchlist.some(item => item.movieId === movie.id)
    );
  }

  addToWatchlist(movieId: number): void {
    this.watchlist.push({
      id: Date.now(),
      userId: 1,
      movieId: movieId
    });
  }

  removeFromWatchlist(movieId: number): void {
    this.watchlist = this.watchlist.filter(
      item => item.movieId !== movieId
    );
  }
}