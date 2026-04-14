import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { WatchlistService } from '../../services/watchlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  recommendedMovies: Movie[] = [];

  searchTerm = '';
  selectedGenres: string[] = [];
  selectedMinRating = 1;

  hasAppliedFilters = false;

  isFilterOpen = false;
  isFilterPinned = false;

  allGenres: string[] = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller'
  ];

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private authService: AuthService,
    private router: Router
  ) {
    this.movies = this.movieService.getMovies();
    this.filteredMovies = this.movies;
    this.recommendedMovies = this.movies.filter(movie => movie.rating > 9);

    this.resetFilters();
  }

  addToWatchlist(movieId: number): void {
    this.watchlistService.addToWatchlist(movieId);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openFilterHover(): void {
    if (!this.isFilterPinned) {
      this.isFilterOpen = true;
    }
  }

  closeFilterHover(): void {
    if (!this.isFilterPinned) {
      this.isFilterOpen = false;
    }
  }

  pinFilter(): void {
    this.isFilterPinned = true;
    this.isFilterOpen = true;
  }

  toggleGenre(genre: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedGenres.includes(genre)) {
        this.selectedGenres.push(genre);
      }
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredMovies = this.movies.filter(movie => {
      const matchesTitle =
        !term || movie.title.toLowerCase().includes(term);

      const matchesGenres =
        this.selectedGenres.length === 0 ||
        this.selectedGenres.some(genre => movie.genres.includes(genre));

      const matchesRating =
        movie.rating >= this.selectedMinRating;

      return matchesTitle && matchesGenres && matchesRating;
    });

    this.hasAppliedFilters = true;
    this.isFilterPinned = false;
    this.isFilterOpen = false;
  }

  onSearchEnter(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedGenres = [];
    this.selectedMinRating = 1;
    this.filteredMovies = this.movies;
    this.hasAppliedFilters = false;
    this.isFilterPinned = false;
    this.isFilterOpen = false;
  }

  getRatingLabel(value: number): string {
    return value === 10 ? '10' : `${value}+`;
  }
}