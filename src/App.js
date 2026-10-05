import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import { useTheme } from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';
import { movies } from './datas/movies';

function favoriteReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}

function initializeFavorites(saved) {
  return Array.isArray(saved)
    ? [...new Set(saved)].filter(id => movies.some(movie => movie.id === id))
    : [];
}

export default function App() {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedId, setSelectedId] = useState(null);
  const [savedFavorites, setSavedFavorites] = useLocalStorage('mini-movie-favorites', []);
  const [favoriteIds, dispatch] = useReducer(favoriteReducer, savedFavorites, initializeFavorites);

  useEffect(() => {
    setSavedFavorites(favoriteIds);
  }, [favoriteIds, setSavedFavorites]);

  const toggleFavorite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);
  const selectMovie = useCallback((id) => setSelectedId(id), []);
  const closeDetail = useCallback(() => setSelectedId(null), []);

  const visibleMovies = useMemo(() => {
    const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    // Từng từ khóa có thể khớp tên phim hoặc thể loại.
    const result = movies.filter(movie => {
      const text = `${movie.title} ${movie.genre}`.toLowerCase();
      return (genre === 'all' || movie.genre === genre)
        && words.every(word => text.includes(word));
    });
    // filter đã tạo mảng mới, nên sort không sửa dữ liệu gốc.
    if (sortOrder === 'high') result.sort((a, b) => b.rating - a.rating);
    if (sortOrder === 'low') result.sort((a, b) => a.rating - b.rating);
    return result;
  }, [search, genre, sortOrder]);

  const selectedMovie = movies.find(movie => movie.id === selectedId);

  return (
    <main className={`page ${theme}`}>
      <div className="movie-manager">
        <Header />
        <div className="content">
          <SearchBar search={search} onSearch={setSearch} />
          <div className="toolbar">
            <GenreFilter genre={genre} onGenreChange={setGenre} />
            <select aria-label="Sắp xếp theo rating" value={sortOrder}
              onChange={event => setSortOrder(event.target.value)}>
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="high">High → Low</option>
              <option value="low">Low → High</option>
            </select>
          </div>
          <p className="stats" aria-live="polite">
            Tổng: {movies.length}<span> | </span>
            Yêu thích: {favoriteIds.length}<span> | </span>
            Đang hiển thị: {visibleMovies.length}
          </p>
          <MovieList movies={visibleMovies} favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite} onSelect={selectMovie} />
          <p className="hint">Bấm tên phim để xem thông tin. Bấm ☆ để đánh dấu yêu thích.</p>
          <MovieDetail movie={selectedMovie} isFavorite={favoriteIds.includes(selectedId)}
            onToggleFavorite={toggleFavorite} onClose={closeDetail} />
        </div>
      </div>
    </main>
  );
}
