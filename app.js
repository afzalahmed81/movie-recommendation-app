// IIFE Immediately invoked function Expressions
(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();
    // console.log(typeof(movies[0].genres));


    // DOM Elements
    const movieList = document.querySelector("#movie-list");
    const genreSelect = document.querySelector("#genre-select");
    const ratingSelect = document.querySelector("#rating-select");
    const yearSelect = document.querySelector("#year-select");
    const submitButton = document.querySelector("#submit-button");

    // const btnElem = document.getElementById("recommend");
    // const listElem = document.getElementById("movie-list");
    // const detailsElem = document.getElementById("movieDetailsContainer");
  
    // Function to generate movie HTML
  function generateMovieHTML(movie) {
    
    return `
    
      <div class="movie">
         <hr>
        <h3>Movie: ${movie.title}</h3>
        <p><strong>Genre:</strong> ${movie.genres}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Release Year:</strong> ${movie.release_date}</p>
      </div>
    `;
  }
  
   // Function to filter movies based on user preferences
   function filterMovies(movies, genre, vote_average, release_date) {
    console.log('from filterMovies',genre,vote_average,release_date);
    return movies.filter(movie => {
      // if (genre && !Array.isArray(movie.genres) || !movie.genres.join(" ").toLowerCase().includes(genre)) {
      //   return false;
      // }
      if (vote_average && movie.vote_average < vote_average) {
        return false;
      }
      if (release_date && movie.release_date.substring(0,4) !== release_date) {
        return false;
      }
      return true;
    });
  }
  
    // Function to handle form submission
  function handleSubmit(event)  {
    event.preventDefault();
  
    const genre = genreSelect.value;
    const vote_average = ratingSelect.value;
    const release_date = yearSelect.value;
    console.log('check input',genre,vote_average,release_date);
  
    const filteredMovies = filterMovies(movies, genre, vote_average, release_date);
    console.log('filtered',filteredMovies);
  
    movieList.innerHTML = "";
  
    if (filteredMovies.length === 0) {
      movieList.innerHTML = "<p>No movies found.</p>";
      return;
    }




      filteredMovies.forEach(movie => {
      const movieHTML = generateMovieHTML(movie);
      movieList.insertAdjacentHTML("beforeend", movieHTML);
    });
  }
  
  // Event listener for form submission
  submitButton.addEventListener("click", handleSubmit);
  })();