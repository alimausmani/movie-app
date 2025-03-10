import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then((response) => {
                console.log(response.data);
                setMovies(response.data);
                setFilteredMovies(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        let filtered = movies;
        if (searchTerm) {
            filtered = movies.filter((movie) =>
                movie.year.toString().includes(searchTerm)
            );
        }
        setFilteredMovies(filtered);
    }, [searchTerm, movies]);


    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= rating ? 'gold' : 'gray' }}>
                    ⭐
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="home">
            <h1>
                <img src="https://cdn-icons-png.flaticon.com/128/3171/3171927.png" alt="Logo" className="movie-logo" />
                Movie List
            </h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by year"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Agar filteredMovies empty ho to "Movie Not Found" show kare */}
            {filteredMovies.length === 0 ? (
                <h2 style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                    ❌ Movie Not Found!
                </h2>
            ) : (
                <div className="movie-grid">
                    {filteredMovies.map((movie) => (
                        <div key={movie._id} className="movie-item">
                            <img src={movie.poster} alt={movie.title} className="movie-image" />
                            <h2>{movie.title}</h2>
                            <p>{movie.year}</p>
                            <p>{movie.genre.join(', ')}</p>
                            <p>Rating: {renderRatingStars(movie.rating)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Home;