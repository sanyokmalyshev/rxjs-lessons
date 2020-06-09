import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

// const search$ = new Observable<Event>(observer => {
//     const search = document.getElementById('search');

//     if (!search) {
//         observer.error('Element not exists on the page');
//         return
//     }

//     search.addEventListener('input', ev => {
//         observer.next(ev);

//     });

// });

const search$: Observable<Event> = fromEvent<Event>(
    document.getElementById('search'), 'input');




search$.pipe(
    map(ev => {
        return (ev.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged()
)
    .subscribe(value => {
        console.log(value);
    });






