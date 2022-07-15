import { fromEvent, throttleTime, scan, tap } from 'rxjs'
























































function print(val: any): void {
    let el = document.createElement('p')
    el.innerHTML = val
    document.body.appendChild(el)
}
