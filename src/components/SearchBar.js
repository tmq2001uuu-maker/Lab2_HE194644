import React, { useRef } from 'react';

export default function SearchBar({ search, onSearch }) {
  const inputRef = useRef(null);
  return (
    <div className="search-bar">
      <input ref={inputRef} type="search" aria-label="Tìm phim theo tên hoặc thể loại"
        placeholder="Tìm tên phim hoặc thể loại..." value={search}
        onChange={event => onSearch(event.target.value)} />
      {search && <button type="button" onClick={() => {
        onSearch('');
        inputRef.current?.focus();
      }}>Xóa tìm kiếm</button>}
    </div>
  );
}
