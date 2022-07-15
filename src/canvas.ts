import { fromEvent, tap, switchMap, takeUntil } from 'rxjs'

const circleSize = 2;

const canvasElem: HTMLCanvasElement = document.querySelector(".main-canvas")
const canvasCtx = canvasElem.getContext('2d')
const canvasObs = fromEvent<MouseEvent>(canvasElem, "mousedown")

canvasObs
    .pipe(
        tap(drawCircle),
        switchMap(_ => {
            return fromEvent<MouseEvent>(
                canvasElem, "mousemove"
            ).pipe(
                takeUntil(fromEvent(document, "mouseup"))
            )
        })
    )
    .subscribe(drawCircle)


function drawCircle(e: MouseEvent) {
    const mousePos = getMousePos(canvasElem, e)

    canvasCtx.beginPath();
    console.log(mousePos.x, mousePos.y)
    canvasCtx.arc(mousePos.x, mousePos.y, circleSize, 0, 2 * Math.PI);
    canvasCtx.fill();
}

function  getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent): { x: number, y: number} {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}
