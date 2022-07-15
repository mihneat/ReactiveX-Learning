import { fromEvent, Subject, interval } from 'rxjs'

const alertTimer = 750
const alertsContainer: HTMLElement = document.querySelector<HTMLElement>(".alerts-container")
const pauseCheckbox: HTMLInputElement = document.querySelector<HTMLInputElement>(".notif-toggle")
const clearBtn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".clear-btn")





const btnClickObs = fromEvent(clearBtn, "click")
btnClickObs.subscribe(_ => { clearAlerts() })

const alertQueue: string[] = []
let isChecked = true;

fromEvent(pauseCheckbox, "click").subscribe(_ => {
    if (!isChecked) {
        while (alertQueue.length > 0) {
            const textToAdd = alertQueue.shift()
            createAlert(textToAdd)
        }
    }

    isChecked = !isChecked
})

const alertSubject = new Subject<string>()
alertSubject.subscribe(text => {
    if (isChecked) {
        createAlert(text)
    } else {
        alertQueue.push(text)
    }
})

const alertGenerator = interval(alertTimer).subscribe(_ => {
    alertSubject.next(Math.random().toString())
})






function createAlert(text: string): void {
    let alertElem = document.createElement('div')
    alertElem.classList.add("alert-container")
    alertElem.innerHTML = text

    alertsContainer.appendChild(alertElem)
}

function clearAlerts(): void {
    while (alertsContainer.firstChild) {
        alertsContainer.removeChild(alertsContainer.firstChild);
    }
}
