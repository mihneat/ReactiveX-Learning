import { from, fromEvent, map, scan, debounceTime, last } from 'rxjs'

const searchBarDelay = 750
const inputField: HTMLInputElement = document.querySelector(".search-bar")
const searchBarObs = fromEvent(inputField, "input")
const responseOuput = document.querySelector('.response-container')

const debouncedSearch = searchBarObs.pipe(
    debounceTime(searchBarDelay),
    map(_ => inputField.value)
)

debouncedSearch.subscribe(val => { 
    //  https://restcountries.com/v3.1/name/{name}
    fetch(`https://swapi.dev/api/${val}`)
        .then(data => data.json())
        .then(data => { 
            from(data.results)
                .pipe(
                    map(obj => Object.values(obj)[0]),
                    scan((finalString, currentString) => finalString += "<br>" + currentString),
                    last())
                .subscribe(x => { responseOuput.innerHTML = x })
        })
        .catch(_ => { responseOuput.textContent = 'tristut' })
 })
