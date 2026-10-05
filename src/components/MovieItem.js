import React, { memo } from 'react';

function MovieItem({ movie, isFavorite, onToggleFavorite, onSelect }) {
  return (
    <tr>
      <td className="title-cell">
        <button type="button" className="favorite-button" aria-pressed={isFavorite}
          aria-label={`${isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'} ${movie.title}`}
          onClick={() => onToggleFavorite(movie.id)}>
          {isFavorite ? '★' : '☆'}
        </button>
        <button type="button" className="movie-title" onClick={() => onSelect(movie.id)}>
          {movie.title}
        </button>
      </td>
      <td>{movie.genre}</td>
      <td>{movie.year}</td>
      <td>{movie.rating.toFixed(1)}</td>
    </tr>
  );
}
export default memo(MovieItem);
