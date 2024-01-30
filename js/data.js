/* exported data */
let pokedex = [];

function getPokemon() {
  if (localStorage.getItem('pokedex-local-storage') === null) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=1008');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      pokedex = JSON.stringify(xhr.response.results);
      localStorage.setItem('pokedex-local-storage', pokedex);
      createPokemonListElements(xhr.response.results);
      handleListItems();
    });
    xhr.send();
  }
}
getPokemon();

function getPokemonByType(type) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://pokeapi.co/api/v2/type/' + type.name + '?limit=1008',
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    xhr.response.pokemon.forEach((object) => {
      document.querySelectorAll('li').forEach((item) => {
        if (item.textContent.toLowerCase().includes(object.pokemon.name)) {
          item.classList.remove('hidden');
        }
      });
    });
  });
  xhr.send();
}

function getPokemonSpeciesInfo(id) {
  const description = document.querySelector('textarea');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    xhr.response['flavor_text_entries'].forEach((entry, index) => {
      if (entry.language.name === 'en') {
        let x = xhr.response['flavor_text_entries'][index]['flavor_text'];
        x = x.replaceAll('\n', ' ');
        x = x.replaceAll('\u000c', ' ');
        description.textContent = x;
      }
    });
  });
  xhr.send();
}

function convertHeightAndWeight(initialHeight, initialWeight) {
  height.textContent = (initialHeight * 3.937008).toFixed(2);
  if (height.textContent > 12) {
    height.textContent = (height.textContent / 12).toFixed(2) + 'ft';
  } else {
    height.textContent = height.textContent + 'in';
  }
  weight.textContent = (initialWeight * 3.527396).toFixed(2);
  if (weight.textContent > 16) {
    weight.textContent = (weight.textContent / 16).toFixed(2) + 'lbs';
  } else {
    weight.textContent = weight.textContent + 'oz';
  }
}

function getPokemonData(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url.dataset.url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    sprite.src = xhr.response.sprites.front_default;
    if (xhr.response.sprites.back_default) {
      backSprite.src = xhr.response.sprites.back_default;
    } else {
      backSprite.src = '';
    }
    const existingImages = document.querySelectorAll('.pokemon-type');
    if (document.querySelectorAll) {
      existingImages.forEach((value) => {
        value.remove();
      });
    }
    let abilitiesText = document.querySelector('.abilities-text');
    abilitiesText.textContent = '';
    xhr.response.abilities.forEach((ability) => {
      const abilityName = ability.ability.name;
      if (!ability['is_hidden']) {
        if (abilitiesText.textContent) {
          abilitiesText.textContent +=
            ', ' + abilityName.slice(0, 1).toUpperCase() + abilityName.slice(1);
        } else {
          abilitiesText.textContent +=
            abilityName.slice(0, 1).toUpperCase() + abilityName.slice(1);
        }
      }
    });
    xhr.response.types.forEach((value) => {
      createPokemonTypeImages(value.type.name);
    });
    convertHeightAndWeight(xhr.response.height, xhr.response.weight);
  });
  xhr.send();
}
