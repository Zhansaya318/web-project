import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [
    {
      id: 1,
      movieId: 1,
      user: 'Aruzhan',
      rating: 9,
      comment: 'Amazing visuals and emotional story.'
    },
    {
      id: 2,
      movieId: 1,
      user: 'Daniyar',
      rating: 8,
      comment: 'One of the best sci-fi movies ever made.'
    },
    {
      id: 3,
      movieId: 2,
      user: 'Aliya',
      rating: 9,
      comment: 'Mind-blowing concept and beautiful cinematography.'
    }
  ];

  getReviewsByMovieId(movieId: number): Review[] {
    return this.reviews.filter(review => review.movieId === movieId);
  }

  addReview(review: Review): void {
    this.reviews.push(review);
  }
  deleteReview(reviewId: number): void {
  this.reviews = this.reviews.filter(r => r.id !== reviewId);
}
}