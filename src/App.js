import { useEffect, useState } from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const apiUrl = 'http://www.omdbapi.com?apikey=89ff281b';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${apiUrl}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, [])
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 ? (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard {...movie} />
                            ))
                        }
                    </div>
                ) : (
                    < div className="empty">
                        <h2>No Movies found</h2>
                    </div>
                )
            }
        </div >
    );
}

export default App;