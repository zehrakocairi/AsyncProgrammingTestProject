const baseurl = 'https://api.themoviedb.org/3';
const apiKeyTail = "api_key=04c35731a5ee918f014970082a0088b1";
const urls = {
    genres: "/genre/movie/list",
    search: '/search/movie',
};

window.onload = async function () {
    let genresObj = await getGenres();
    showGenres(genresObj.genres);
}

async function getData(relativeUrl) {
    let url = baseurl + relativeUrl;
    if (url.includes('?')) {
        url = url + '&' + apiKeyTail
    }
    else {
        url = url + '?' + apiKeyTail
    }
    return await fetch(url);
}

async function getGenres() {
    var response = await getData(urls.genres);
    var genres = await response.json();
    return genres;
}

async function selectGenre(genreName) { // search by genre
    var searchResults = await searchByKeywordAsync(genreName);
    showMovies(searchResults);
}

async function search() {
    var searchText = document.getElementById('search').value;
    var yearFilter = document.getElementById('year-filter').value;
    var filterQuery = `&year=${yearFilter}`;
    var results = await searchByKeywordAsync(searchText, filterQuery);
    showMovies(results);
}

async function searchByKeywordAsync(searchText, filterQuery) {
    var searchUrl = urls.search + `?query=${searchText}&include_adult=true${filterQuery}`;
    var response = await getData(searchUrl);
    var searchResults = await response.json();
    return searchResults;
}

function showGenres(genres) {
    let genresList = document.querySelector('#genres .genre-list');
    let genresInHtmls = genres.map(g => {
        return `
        <div class="genre-card" onclick="selectGenre('${g.name}')">
            <p>
                ${g.name}
            </p>
        </div>
        `
    });
    var htmlToAdd = genresInHtmls.reduce((acc, item) => {
        return acc + item;
    }, '');
    var elementToAdd = document.createElement('div');
    elementToAdd.innerHTML = htmlToAdd;
    genresList.appendChild(elementToAdd);

}

function showMovies({ results }) {
    var cardsHtmlAggregate = results.reduce((acc, movie) => {
        return acc + generateCardHtml(movie);
    }, '');

    document.getElementById('movie-cards').innerHTML = cardsHtmlAggregate;
}


function generateCardHtml(movie) {
    movie.poster_path = movie.poster_path == null
        ? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
        : 'https://image.tmdb.org/t/p/w200/' + movie.poster_path;
    return `
    <div class="movie-card">
        <img src="${movie.poster_path}" alt="${movie.original_title}">
        <div>
            <h4>${movie.original_title}</h4>
        </div>
    </div>
`;
}

