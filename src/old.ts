/*

fromEvent(document, 'click')
  .pipe(
    scan((count) => count + 1, 0),
    throttleTime(500),
    tap()
  )
  .subscribe(print);

*/



/*

const numbers = of(-3, 5, 7, 2, -7, 9, -2)

numbers
    .subscribe(print)

*/


/*

const obs = of(1, 2, 3, 4)
    .pipe(
        map(x => x * x)
    )

obs.subscribe(print2)
obs.subscribe(print)

*/
