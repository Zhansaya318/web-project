import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Movie } from '../../models/movie';
import { Review } from '../../models/review';

import { MovieService } from '../../services/movie.service';
import { ReviewService } from '../../services/review.service';
import { WatchlistService } from '../../services/watchlist.service';
import { AuthService } from '../../services/auth.service';

export interface Comment {
  id: number;
  movieId: number;
  user: string;
  text: string;
  date: string;
  replyTo?: string;
}

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {

  @ViewChild('trailerSection') trailerSection!: ElementRef;

  movie?: Movie;
  reviews: Review[] = [];
  similarMovies: Movie[] = [];
  comments: Comment[] = [];

  newRating: number = 0;
  newComment: string = '';
  newCommentText: string = '';

  showWatchlistMenu = false;
  showAllReviews = false;
  replyingTo: Comment | null = null;
  openMenuCommentId: number | null = null;

  // Delete modal
  showDeleteModal = false;

  cachedTrailerUrl: SafeResourceUrl = '';
  private reviewsStorageKey = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private watchlistService: WatchlistService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movieService.getMovieById(id);
    this.reviewsStorageKey = `reviews_${id}`;

    this.loadReviews(id);
    this.loadComments(id);

    if (this.movie) {
      this.cachedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.movie.trailerId}`
      );
      this.similarMovies = this.movieService.getMovies()
        .filter(m => m.id !== id && m.genres.some(g => this.movie!.genres.includes(g)))
        .slice(0, 3);
    }

    window.scrollTo({ top: 0 });
  }

  // Reviews
  loadReviews(movieId: number): void {
    const raw = localStorage.getItem(`reviews_${movieId}`);
    const saved: Review[] = raw ? JSON.parse(raw) : [];
    const fromService = this.reviewService.getReviewsByMovieId(movieId);
    const merged = [...fromService];
    saved.forEach(s => {
      if (!merged.find(r => r.id === s.id)) merged.push(s);
    });
    this.reviews = merged;
  }

  saveReviews(): void {
    if (!this.movie) return;
    localStorage.setItem(this.reviewsStorageKey, JSON.stringify(this.reviews));
  }

  // Проверяет оставил ли текущий пользователь ревью
  get myReview(): Review | null {
    const user = this.authService.getCurrentUser();
    if (!user) return null;
    return this.reviews.find(r => r.user === user) || null;
  }

  get hasReviewed(): boolean {
    return !!this.myReview;
  }

  get displayedReviews(): Review[] {
    return this.showAllReviews ? this.reviews : this.reviews.slice(0, 3);
  }

  toggleViewAll(): void {
    this.showAllReviews = !this.showAllReviews;
  }

  setRating(value: number): void {
    this.newRating = value;
  }

  submitReview(): void {
    if (!this.movie || !this.newRating || !this.newComment.trim()) return;
    if (this.hasReviewed) return;
    const currentUser = this.authService.getCurrentUser();
    const review: Review = {
      id: Date.now(),
      movieId: this.movie.id,
      user: currentUser || 'Guest',
      rating: this.newRating,
      comment: this.newComment
    };
    this.reviews.push(review);
    this.saveReviews();
    this.newRating = 0;
    this.newComment = '';
  }

  // Delete modal
  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDeleteReview(): void {
    if (!this.myReview) return;
    this.reviews = this.reviews.filter(r => r.id !== this.myReview!.id);
    this.saveReviews();
    this.showDeleteModal = false;
  }

  // Comments
  loadComments(movieId: number): void {
    const raw = localStorage.getItem(`comments_${movieId}`);
    this.comments = raw ? JSON.parse(raw) : [];
  }

  saveComments(): void {
    if (!this.movie) return;
    localStorage.setItem(`comments_${this.movie.id}`, JSON.stringify(this.comments));
  }

  submitComment(): void {
    if (!this.newCommentText.trim()) return;
    const user = this.authService.getCurrentUser() || 'Guest';
    const comment: Comment = {
      id: Date.now(),
      movieId: this.movie!.id,
      user,
      text: this.newCommentText.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      replyTo: this.replyingTo ? this.replyingTo.user : undefined
    };
    this.comments.push(comment);
    this.saveComments();
    this.newCommentText = '';
    this.replyingTo = null;
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter(c => c.id !== commentId);
    this.saveComments();
  }

  canDeleteComment(comment: Comment): boolean {
    const user = this.authService.getCurrentUser();
    return !!user && comment.user === user;
  }

  setReplyTo(comment: Comment): void {
    this.replyingTo = comment;
    this.newCommentText = '';
  }

  cancelReply(): void {
    this.replyingTo = null;
  }

  toggleCommentMenu(commentId: number): void {
    this.openMenuCommentId = this.openMenuCommentId === commentId ? null : commentId;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  scrollToTrailer(): void {
    this.trailerSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  getMovieStatus(): 'none' | 'watchlist' | 'watched' {
    if (!this.movie) return 'none';
    return this.watchlistService.getStatus(this.movie.id);
  }

  toggleWatchlistMenu(): void {
    this.showWatchlistMenu = !this.showWatchlistMenu;
  }

  addToWatchlist(): void {
    if (!this.movie) return;
    this.watchlistService.addToWatchlist(this.movie.id);
    this.showWatchlistMenu = false;
  }

  markAsWatched(): void {
    if (!this.movie) return;
    this.watchlistService.markAsWatched(this.movie.id);
    this.showWatchlistMenu = false;
  }

  removeFromWatchlist(): void {
    if (!this.movie) return;
    this.watchlistService.removeFromWatchlist(this.movie.id);
    this.showWatchlistMenu = false;
  }
  navigateToMovie(id: number): void {
  this.router.navigate(['/movie', id]).then(() => {
    window.scrollTo({ top: 0 });
    const newId = id;
    this.movie = this.movieService.getMovieById(newId);
    this.reviewsStorageKey = `reviews_${newId}`;
    this.loadReviews(newId);
    this.loadComments(newId);
    if (this.movie) {
      this.cachedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.movie.trailerId}`
      );
      this.similarMovies = this.movieService.getMovies()
        .filter(m => m.id !== newId && m.genres.some(g => this.movie!.genres.includes(g)))
        .slice(0, 3);
    }
  });
}
}