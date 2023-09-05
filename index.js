console.log('Has establecido una conexión...');

document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.querySelector('#fetch-pokemon');
    fetchButton.addEventListener('click', fetchPokemonData);
});

function fetchPokemonData() {
    const inputNumber = document.querySelector('#pokemon-number').value;
    const pokemonContainer = document.querySelector('#pokemon-container');
    pokemonContainer.innerHTML = '';

    if (!inputNumber) {
        renderError("Por favor, ingrese un número de Pokémon válido.");
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${inputNumber}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró ningún Pokémon con ese número.");
            }
            return response.json();
        })
        .then(pokemonData => {
            renderPokemon(pokemonData);
        })
        .catch(error => {
            renderError(error.message);
        });
}

function renderPokemon(pokemonData) {
    const pokemonContainer = document.querySelector('#pokemon-container');

    const card = document.createElement('div');
    card.classList.add('ui', 'card');
    card.classList.add(pokemonData.types[0].type.name);

    const name = document.createElement('h2');
    name.textContent = pokemonData.name;

    const types = document.createElement('p');
    types.textContent = "Tipo: " + pokemonData.types.map(type => typeTraducciones[type.type.name]).join(', ');

    const height = document.createElement('p');
    height.textContent = `Altura: ${pokemonData.height / 10} m`;

    const weight = document.createElement('p');
    weight.textContent = `Peso: ${pokemonData.weight / 10} kg`;

    const image = document.createElement('img');
    image.src = pokemonData.sprites.front_default;
    
    card.appendChild(name);
    card.appendChild(types);
    card.appendChild(height);
    card.appendChild(weight);
    card.appendChild(image);
    
    pokemonContainer.appendChild(card);
}

function renderError(errorMessage) {
    const pokemonContainer = document.querySelector('#pokemon-container');
    pokemonContainer.innerHTML = '';

    const errorImage = document.createElement('img');
    errorImage.src = 'error404.png'; // 
    errorImage.style.width = '400px'; // 

    const errorText = document.createElement('p');
    errorText.textContent = errorMessage;
    errorText.classList.add('ui', 'error', 'message');

    const errorContainer = document.createElement('div');
    errorContainer.style.display = 'flex';
    errorContainer.style.flexDirection = 'column';
    errorContainer.style.alignItems = 'center';

    errorContainer.appendChild(errorImage);
    errorContainer.appendChild(errorText);

    pokemonContainer.appendChild(errorContainer);
}

const typeTraducciones = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada'
};
