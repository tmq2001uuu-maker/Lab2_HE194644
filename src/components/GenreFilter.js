import React from 'react';

export default function GenreFilter({ genre, onGenreChange }) {
  return (
    <select aria-label="Tất cả thể loại" value={genre}
      onChange={event => onGenreChange(event.target.value)}>
      <option value="all">Tất cả thể loại</option>
      {['Action', 'Animation', 'Comedy', 'Drama', 'Romance', 'Sci-Fi'].map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  );
}
