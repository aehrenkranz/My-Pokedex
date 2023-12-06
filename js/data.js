/* exported data */
let pokedex=[]
function getPokemon(){
  if (localStorage.getItem('pokedex-local-storage')===null){
  const xhr=new XMLHttpRequest()
  xhr.open('GET','https://pokeapi.co/api/v2/pokemon/?limit=9999')
  xhr.responseType='json'
  xhr.addEventListener('load', function(){
    pokedex=JSON.stringify(xhr.response.results)
    localStorage.setItem('pokedex-local-storage',pokedex)
  })
  xhr.send()
}
}

document.addEventListener('DOMContentLoaded',getPokemon())

const filteredPokedex=[]
function getPokemonByType(type){
  const xhr=new XMLHttpRequest()
  xhr.open('GET','https://pokeapi.co/api/v2/type/'+ type.name + '?limit=9999')
  xhr.responseType='json'
  xhr.addEventListener('load', function(){
    xhr.response.pokemon.forEach((value)=>{
      for(let i=0;i<listItems.length;i++){
        if(listItems[i].textContent.toLowerCase().includes(value.pokemon.name)){
          listItems[i].classList.remove('hidden')
            }
          }
        }
      )
    }
  )
  xhr.send()
}
