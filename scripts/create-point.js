/**
document.querySelector("select[name=uf]")
.addEventListener("change", () => {
    console.log("mudei")
}) */

function populateUfs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => res.json() )
    .then( states => {

        for(state of states) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUfs()

function getCities(event) {  
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)

    citySelect.innerHTML = "<option value=>Seleciona a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( (res) => res.json() )
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

/** Itens de Coleta*/ 
//pegar todos os li's
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    //pega o id do li selecionado
    const itemId = itemLi.dataset.id

    //verificar se existens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId //isso sera true ou false
        return itemFound
    })

    // se ja estiver selecionado, tirar da selecao
    if(alreadySelected >= 0) {
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, 
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    //actualizar o campo escondido com os itens selecionados
    collectItems.value = selectedItems
    
}