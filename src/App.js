import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/pages';
import MovieDetails from './components/pages/movie-details';
import SearchMoviePage from './components/pages/search-movie';

/*************
* Global CSS 
************/
import './assets/css/app.css';

/*************
* Common CSS 
************/

// Header
import './assets/css/commons/head.css';
import './assets/css/commons/search-movie-bar.css';

// Loader
import './assets/css/commons/page-loader.css';
import './assets/css/commons/loading-animation.css';

// Pagination
import './assets/css/commons/pagination.css';
import './assets/css/commons/pagination-item.css';

// Movies
import './assets/css/commons/movie-item.css';
import './assets/css/commons/movie-banner.css';
import './assets/css/commons/movie-genre.css';

// Others
import './assets/css/commons/round-dot.css';
import './assets/css/commons/text-group.css';
import './assets/css/commons/text-list.css';
import './assets/css/commons/card-item.css';

/*************
*  Pages CSS 
************/
import './assets/css/pages/index.css';
import './assets/css/pages/movie-details.css';
import './assets/css/pages/page-not-found.css';
import './assets/css/pages/movie-not-found.css';

/*************
* Page Components CSS 
************/

// Index page
import './assets/css/page-components/index/popular-movies.css';
import './assets/css/page-components/index/searched-movies.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/:page' element={<Index />} />
        <Route path='/search' element={<SearchMoviePage />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
