/* exported data */
let pokedex = [];

function getPokemon() {
  if (localStorage.getItem('pokedex-local-storage') === null) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=9999');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      pokedex = JSON.stringify(xhr.response.results);
      localStorage.setItem('pokedex-local-storage', pokedex);
    });
    xhr.send();
  }
}

document.addEventListener('DOMContentLoaded', getPokemon());

function getPokemonByType(type) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://pokeapi.co/api/v2/type/' + type.name + '?limit=9999',
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    xhr.response.pokemon.forEach((object) => {
      listItems.forEach((item) => {
        if (item.textContent.toLowerCase().includes(object.pokemon.name)) {
          item.classList.remove('hidden');
        }
      });
    });
  });
  xhr.send();
}
