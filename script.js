
const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, releaseYear: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
];

// Helper functions
const addMovie = (collection, movie) => {
    collection.push(movie);
    renderMovies(collection);
};

const listMoviesByGenre = (collection, genre) => {
    return collection.filter(movie => movie.genre === genre);
};

const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => movie.rating > highest.rating ? movie : highest);
};

const renderMovies = (collection) => {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    collection.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (${movie.releaseYear}) - ${movie.genre} - Rating: ${movie.rating}`;
        movieList.appendChild(li);
    });
};

const renderFilteredMovies = (collection, genre) => {
    const filteredMovies = listMoviesByGenre(collection, genre);
    const filteredList = document.getElementById("filtered-movies");
    filteredList.innerHTML = "";
    filteredMovies.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (${movie.releaseYear}) - Rating: ${movie.rating}`;
        filteredList.appendChild(li);
    });
};

const renderHighestRatedMovie = (collection) => {
    const highestRatedMovie = findHighestRatedMovie(collection);
    const highestRatedDiv = document.getElementById("highest-rated-movie");
    highestRatedDiv.textContent = `${highestRatedMovie.title} (${highestRatedMovie.releaseYear}) - Rating: ${highestRatedMovie.rating}`;
};

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
    renderMovies(movies);

    // Handle movie addition form
    const addMovieForm = document.getElementById("add-movie-form");
    addMovieForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("movie-title").value;
        const genre = document.getElementById("movie-genre").value;
        const rating = parseFloat(document.getElementById("movie-rating").value);
        const releaseYear = parseInt(document.getElementById("movie-release-year").value);

        if (title && genre && !isNaN(rating) && !isNaN(releaseYear)) {
            const newMovie = { title, genre, rating, releaseYear };
            addMovie(movies, newMovie);
        }

        // Reset form fields
        addMovieForm.reset();
    });

    // Handle genre filter change
    const genreFilter = document.getElementById("genre-filter");
    genreFilter.addEventListener("change", (event) => {
        const selectedGenre = event.target.value;
        renderFilteredMovies(movies, selectedGenre);
    });

    // Render highest rated movie
    renderHighestRatedMovie(movies);
});