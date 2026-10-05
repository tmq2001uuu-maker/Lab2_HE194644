import React from 'react';
import MovieItem from './MovieItem';

export default function MovieList({ movies, favoriteIds, onToggleFavorite, onSelect }) {
  if (!movies.length) return <p className="empty" role="status">Không tìm thấy phim phù hợp.</p>;
  return (
    <div className="table-scroll">
      <table>
        <caption className="sr-only">Danh sách phim</caption>
        <thead><tr><th scope="col">Title</th><th scope="col">Genre</th><th scope="col">Year</th><th scope="col">Rating</th></tr></thead>
        <tbody>
          {movies.map(movie => <MovieItem key={movie.id} movie={movie}
            isFavorite={favoriteIds.includes(movie.id)} onToggleFavorite={onToggleFavorite} onSelect={onSelect} />)}
        </tbody>
      </table>
    </div>
  );
}
