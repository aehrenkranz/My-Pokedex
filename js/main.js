const pokedexStorageJSON=localStorage.getItem('pokedex-local-storage')
let pokedexData=[]
const list=document.querySelector('ul')
const searchBar=document.querySelector('input')

function createListElements(arr){
  arr.forEach((currentValue,index)=>{
    const entry=document.createElement('li')
    const pokeballIcon=document.createElement('img')
    const pokemonName=document.createElement('p')
    const capitalizedPokemon=currentValue.name[0].toUpperCase() +  currentValue.name.slice(1)
    pokemonName.textContent=`${index+1}  ${capitalizedPokemon}`
    pokeballIcon.src='../images/pokeball.png'
    pokeballIcon.className='marker'
    entry.appendChild(pokeballIcon)
    entry.appendChild(pokemonName)
    list.appendChild(entry)
    }
  )
}

if(pokedexStorageJSON!==null){
  pokedexData=JSON.parse(pokedexStorageJSON)
  createListElements(pokedexData)
    }

const listItems=document.querySelectorAll('li')
listItems.forEach((value)=>{
  value.addEventListener('click',()=>{highlightEntry(value)})
  searchBar.addEventListener('input',()=>{
      handleSearch(value)
        }
      )
  }
)

  function highlightEntry(clicked){
    listItems.forEach((element)=>{
      element.classList.remove('selected')
      }
    )
    clicked.classList.add('selected')
  }

function handleSearch(entry){
  if(entry.textContent.toLowerCase().includes(searchBar.value.toLowerCase())){
        entry.classList.remove('hidden')
        }
      else{
        entry.classList.add('hidden')
      }
    }

const filterIcon=document.getElementById('filter-icon')
const typeFilterContainer=document.getElementById('type-filter-container')
filterIcon.addEventListener('click',()=>{
  if(typeFilterContainer.style.display==='flex'){
    typeFilterContainer.style.display='none'
  }
  else{
    typeFilterContainer.style.display='flex'
  }

})

const typeCheckboxes=document.querySelectorAll('.checkbox')
function handleTypeFilter(event){
  if(event.target.className==='checkbox'){
    let counter=0
    typeCheckboxes.forEach((value)=>{
      if(value.checked===true){
        listItems.forEach((element)=>{
        element.classList.add('hidden')
            })
        getPokemonByType(value.name)}
      else{
        counter++
        if (counter===18){
          listItems.forEach((element)=>{
          element.classList.remove('hidden')
            })
          }
        }
      }
    )
  }
}
typeFilterContainer.addEventListener('click',handleTypeFilter)
