import React, { useEffect, useRef } from 'react';

export default function MovieDetail({ movie, isFavorite, onToggleFavorite, onClose }) {
  const headingRef = useRef(null);
  const movieId = movie?.id;
  useEffect(() => {
    if (movieId != null) headingRef.current?.focus();
  }, [movieId]);
  if (!movie) return null;
  return (
    <section className="movie-detail" aria-labelledby="detail-title">
      <div className="detail-header">
        <h2 id="detail-title" ref={headingRef} tabIndex={-1}>Thông tin phim</h2>
        <button type="button" onClick={onClose}>Đóng</button>
      </div>
      <h3>{movie.title}</h3>
      <dl>
        <div><dt>Genre</dt><dd>{movie.genre}</dd></div>
        <div><dt>Year</dt><dd>{movie.year}</dd></div>
        <div><dt>Rating</dt><dd>{movie.rating.toFixed(1)}</dd></div>
        
      </dl>
      <p className="description">{movie.description}</p>
      <button type="button" aria-pressed={isFavorite} onClick={() => onToggleFavorite(movie.id)}>
        {isFavorite ? '★ Bỏ yêu thích' : '☆ Thêm vào yêu thích'}
      </button>
    </section>
  );
}
