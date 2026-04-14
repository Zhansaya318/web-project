import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Movie } from '../../models/movie';
import { Review } from '../../models/review';

import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {

  movie?: Movie;
  reviews: Review[] = [];

  newRating: number = 0;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private watchlistService: WatchlistService
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movie = this.movieService.getMovieById(id);

    this.reviews = this.reviewService.getReviewsByMovieId(id);
  }

  submitReview() {

    if (!this.movie) return;

    const review: Review = {
      id: Date.now(),
      movieId: this.movie.id,
      user: 'Guest',
      rating: this.newRating,
      comment: this.newComment
    };

    this.reviewService.addReview(review);

    this.reviews = this.reviewService.getReviewsByMovieId(this.movie.id);

    this.newRating = 0;
    this.newComment = '';
  }

  addToWatchlist() {
    if (!this.movie) return;

    this.watchlistService.addToWatchlist(this.movie.id);
  }

}