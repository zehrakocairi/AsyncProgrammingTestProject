const baseurl = 'https://api.themoviedb.org/3';
const apiKeyTail = "api_key=04c35731a5ee918f014970082a0088b1";
const urls = {
    genres: "/genre/movie/list",
    search: '/search/movie',
};

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

async function selectGenre(genreName) {
    debugger;
    var searchUrl = urls.search + `?query=${genreName}`;
    var response = await getData(searchUrl);
    var searchResults =  await response.json();
    debugger;

}

window.onload = async function () {
    let genresObj = await getGenres();
    showGenres(genresObj.genres);
}