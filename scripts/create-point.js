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

    citySelect.innerHTML = ""
    
    fetch(url)
    .then( (res) => res.json() )
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)