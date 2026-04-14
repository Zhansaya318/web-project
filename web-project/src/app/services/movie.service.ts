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
      genre: 'Sci-Fi',
      year: 2014,
      description: 'A team of explorers travel through a wormhole in space.',
      rating: 8.6,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 2,
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      description: 'A thief who steals corporate secrets through dream-sharing.',
      rating: 8.8,
      poster: 'https://via.placeholder.com/300x420'
    },
    {
      id: 3,
      title: 'Arrival',
      genre: 'Sci-Fi',
      year: 2016,
      description: 'A linguist works with the military to communicate with aliens.',
      rating: 8.1,
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