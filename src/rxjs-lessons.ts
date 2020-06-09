import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';

// const search$ = new Observable<Event>(observer => {
//     const search = document.getElementById('search');
//     const stop = document.getElementById('stop');

//     if (!search || !stop) {
//         observer.error('Element not exists on the page');
//         return
//     }

//     const onSearch = ev => {
//         console.log(123);
//         checkSubscription();
//         observer.next(ev);

//     }

//     const onStop = ev => {
//         checkSubscription();
//         observer.complete();
//         clear();
//     };

//     search.addEventListener('input', onSearch);
//     stop.addEventListener('click', onStop)

//     const checkSubscription = () => {
//         if(observer.closed) {
//             clear();
//         }
//     }

//     const clear = () => {
//         search.removeEventListener('input', onSearch);
//     };
// });

const search$: Observable<Event> = fromEvent<Event>(
    document.getElementById('search'), 'input');

const stop$: Observable<Event> = fromEvent<Event>(
    document.getElementById('stop'), 'click');

search$.pipe(
    map(ev => {
        return (ev.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged(),
    takeUntil(stop$)
)
    .subscribe(value => {
        console.log(value);
    });






