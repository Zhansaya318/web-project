import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [
    {
      id: 1,
      title: 'Interstellar',
      genres: ['Sci-Fi', 'Drama', 'Adventure'],
      year: 2014,
      description: 'A team of explorers travel through a wormhole in space.',
      rating: 9.2,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 2,
      title: 'Inception',
      genres: ['Sci-Fi', 'Thriller', 'Action'],
      year: 2010,
      description: 'A thief who steals corporate secrets through dream-sharing.',
      rating: 9.1,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 3,
      title: 'Arrival',
      genres: ['Sci-Fi', 'Drama', 'Mystery'],
      year: 2016,
      description: 'A linguist works with the military to communicate with aliens.',
      rating: 8.1,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 4,
      title: 'The Dark Knight',
      genres: ['Action', 'Crime', 'Drama'],
      year: 2008,
      description: 'Batman faces the Joker in Gotham City.',
      rating: 9.3,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 5,
      title: 'Titanic',
      genres: ['Drama', 'Romance'],
      year: 1997,
      description: 'A love story unfolds aboard the Titanic.',
      rating: 7.9,
      poster: 'https://via.placeholder.com/300x420'
    }
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }
}