
//processamento assincrono. Executado e que não tem resposta de imediato. Uma hora vai ter a resposta
//promise é a promessa de um resultado.
//then -> faça alguma coisa
//interface -> promessa de alguma coisa e quando for disponibilizado, vai chamar o then. caso contrário, catch. e o finally.
// Por padrão o fetch utiliza o get sempre

/*
Uma forma de se fazer:

fetch(url)
   .then((response) => {
       return response.json();
   })
   .then ((jsonBody)=>{
       console.log(jsonBody);
   })
   .catch((error) => {
       // O catch serve para caso dê erro a requisição
       console.log(error);
   })
   .finally(() => {
       //Vai ser feito independente do fracasso ou do sucesso quando finalizar a requisição, processo.
       console.log('requisição concluída');
   })
 //const listItems = [];

   // for (let i = 0; i < pokemons.length; i++) {
   //     const pokemon = pokemons[i];
   //     listItems.push(convertPokemonToLi(pokemon));
   // }
   // console.log(listItems);
*/
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const popup = document.getElementById('popup');

const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src= "${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit)
})

/*
Essa linha de código acima é a mesma coisa dessa de baixo:

const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));

const newHtml = newList.join();

pokemonList.innerHTML += newHtml;*/

