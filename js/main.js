const pokedexStorageJSON=localStorage.getItem('pokedex-local-storage')
let pokedexStorage=[]
const list=document.querySelector('ul')
if(pokedexStorageJSON!==null){
  pokedexStorage=JSON.parse(pokedexStorageJSON)
  pokedexStorage.forEach((currentValue,index)=>{
    const entry=document.createElement('li')
    const pokeballIcon=document.createElement('img')
    const pokemonName=document.createElement('p')
    const capitalizedPokemon=currentValue.name[0].toUpperCase() +  currentValue.name.slice(1)
    pokemonName.textContent=`${index} ${capitalizedPokemon}`
    pokeballIcon.src='../images/pokeball.png'
    pokeballIcon.className='marker-mobile'
    entry.appendChild(pokeballIcon)
    entry.appendChild(pokemonName)
    list.appendChild(entry)
  })}

const listItems=document.querySelectorAll('li')
list.addEventListener('click',(event)=>{
  event.target.closest('li').className='selected'
  listItems.forEach((element)=>{if (event.target.closest('li')!==element){
    element.className=''
  }})})
