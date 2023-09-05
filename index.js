// Función para buscar un Pokémon en la PokeAPI
function buscarPokemon() {
    // Obtener el número del Pokémon ingresado por el usuario
    const pokemonNumber = document.getElementById("pokemonNumber").value;

    // Validar si se ingresó un número
    if (!pokemonNumber) {
        mostrarError("Por favor, ingrese un número de Pokémon.");
        return;
    }

    // Hacer una solicitud a la PokeAPI para obtener los datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró ningún Pokémon con ese número.');
            }
            return response.json();
        })
        .then(data => {
            // Crear una card con los datos del Pokémon
            const pokemonContainer = document.getElementById("pokemonContainer");
            pokemonContainer.innerHTML = `
                <div class="pokemon-card">
                    <h2>${data.name}</h2>
                    <p>Tipo principal: ${data.types[0].type.name}</p>
                    <p>Altura: ${data.height / 10} m</p>
                    <p>Peso: ${data.weight / 10} kg</p>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                </div>
            `;
        })
        .catch(error => {
            mostrarError(error.message);
        });
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    const pokemonContainer = document.getElementById("pokemonContainer");
    pokemonContainer.innerHTML = `<p class="error">${mensaje}</p>`;
}
