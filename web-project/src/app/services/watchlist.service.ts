import { Injectable } from '@angular/core';
import { WatchlistItem } from '../models/watchlist';
import { Movie } from '../models/movie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private storageKey = 'watchlist_data';

  constructor(private movieService: MovieService) {}

  private load(): WatchlistItem[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private save(list: WatchlistItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  getWatchlistMovies(): Movie[] {
    const list = this.load();
    const movies = this.movieService.getMovies();
    return movies.filter(movie =>
      list.some(item => item.movieId === movie.id)
    );
  }

  getStatus(movieId: number): 'none' | 'watchlist' | 'watched' {
    const list = this.load();
    const item = list.find(i => i.movieId === movieId);
    return item ? item.status : 'none';
  }

  addToWatchlist(movieId: number): void {
    const list = this.load();
    const existing = list.find(i => i.movieId === movieId);
    if (existing) {
      existing.status = 'watchlist';
    } else {
      list.push({ id: Date.now(), userId: 1, movieId, status: 'watchlist' });
    }
    this.save(list);
  }

  markAsWatched(movieId: number): void {
    const list = this.load();
    const existing = list.find(i => i.movieId === movieId);
    if (existing) {
      existing.status = 'watched';
    } else {
      list.push({ id: Date.now(), userId: 1, movieId, status: 'watched' });
    }
    this.save(list);
  }

  removeFromWatchlist(movieId: number): void {
    const list = this.load().filter(i => i.movieId !== movieId);
    this.save(list);
  }
}