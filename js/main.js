const pokedexStorageJSON = localStorage.getItem('pokedex-local-storage');
let pokedexData = [];
const list = document.querySelector('ul');
const searchBar = document.querySelector('input');

function createPokemonListElements(arr) {
  arr.forEach((currentValue) => {
    const entry = document.createElement('li');
    const pokeballIcon = document.createElement('img');
    const pokemonName = document.createElement('p');
    const capitalizedPokemon =
      currentValue.name[0].toUpperCase() + currentValue.name.slice(1);
    const pokemonID = currentValue.url.split('/')[6];
    pokemonName.textContent = `${pokemonID}  ${capitalizedPokemon}`;
    pokeballIcon.src = 'images/pokeball.png';
    pokeballIcon.className = 'marker';
    entry.appendChild(pokeballIcon);
    entry.appendChild(pokemonName);
    entry.setAttribute('data-url', currentValue.url);
    list.appendChild(entry);
  });
}

if (pokedexStorageJSON !== null) {
  pokedexData = JSON.parse(pokedexStorageJSON);
  createPokemonListElements(pokedexData);
}

const sprite = document.getElementById('sprite');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const backSprite = document.getElementById('back-sprite');
const listItems = document.querySelectorAll('li');
listItems.forEach((value, index) => {
  value.addEventListener('click', () => {
    highlightEntry(value);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', value.dataset.url);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      sprite.src = xhr.response.sprites.front_default;
      backSprite.src = xhr.response.sprites.back_default;
      height.textContent = xhr.response.height * 4 + ' in';
      weight.textContent = xhr.response.weight * 0.2 + ' oz';
    });
    xhr.send();
  });
  searchBar.addEventListener('input', () => {
    handleSearch(value);
  });
});

function highlightEntry(clicked) {
  listItems.forEach((element, index) => {
    element.classList.remove('selected');
  });
  clicked.classList.add('selected');
}

function handleSearch(entry) {
  if (entry.textContent.toLowerCase().includes(searchBar.value.toLowerCase())) {
    entry.classList.remove('hidden');
  } else {
    entry.classList.add('hidden');
  }
}

const filterIcon = document.getElementById('filter-icon');
const typeFilterContainer = document.getElementById('type-filter-container');
filterIcon.addEventListener('click', () => {
  if (typeFilterContainer.style.display === 'flex') {
    typeFilterContainer.style.display = 'none';
  } else {
    typeFilterContainer.style.display = 'flex';
  }
});

const typeCheckboxes = document.querySelectorAll('.checkbox');
function handleTypeFilter(event) {
  let counter = 0;
  if (event.target.className === 'checkbox') {
    listItems.forEach((item) => {
      item.classList.add('hidden');
    });
    typeCheckboxes.forEach((value) => {
      if (value.checked === true) {
        getPokemonByType(value);
      } else {
        counter++;
      }
    });
  }
  if (counter === typeCheckboxes.length) {
    listItems.forEach((element) => element.classList.remove('hidden'));
  }
}
typeFilterContainer.addEventListener('click', handleTypeFilter);

function clearCheckboxes() {
  typeCheckboxes.forEach((value) => {
    value.checked = false;
  });
}

document.addEventListener('DOMContentLoaded', clearCheckboxes());
