import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import './App.css';
import { Searching_bar } from './Searching_bar'; // Asegúrate de que el nombre sea correcto

const App = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 50;

  // Función para manejar la búsqueda y actualizar el estado
  const fetchShows = async (query, pageNum = 0) => {
    try {
      let url = '';
      if (query === '') {
        url = `https://api.tvmaze.com/shows?page=${pageNum}`;
      } else {
        url = `https://api.tvmaze.com/search/shows?q=${query}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (query === '') {
        // Para la búsqueda vacía, concatenar los datos con los existentes
        setShows(prevShows => [...prevShows, ...data]);
      } else {
        // Para la búsqueda con query, actualizar con nuevos datos
        const showData = data.map(item => item.show);
        setShows(showData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Use useEffect para manejar la actualización de shows en función de searchQuery y page
  useEffect(() => {
    if (searchQuery === '') {
      // Si el query está vacío, cargar los datos de la página actual
      fetchShows(searchQuery, page);
    } else {
      // Si hay un query, actualizar los datos según la búsqueda
      fetchShows(searchQuery);
    }
  }, [searchQuery, page]);

  // Cuando searchQuery cambia, reiniciar la página a 0
  useEffect(() => {
    if (searchQuery === '') {
      // Resetear la página y los resultados si no hay búsqueda activa
      setPage(0);
      setShows([]); // Opcional: Limpia los resultados si es necesario
    }
  }, [searchQuery]);

  // Paginar los resultados de búsqueda
  const startIdx = page * itemsPerPage;
  const paginatedShows = shows.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(shows.length / itemsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Searching_bar onSearch={handleSearch} />
      <div className="shows_container">
        {paginatedShows.map(show => (
          <div className="show_container" key={show.id}>
            <h5>{show.name}</h5>
            <img src={show.image ? show.image.medium : ''} alt={show.name} />
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
    </>
  );
};

export default App;
