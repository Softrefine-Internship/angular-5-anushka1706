import { Observable } from 'rxjs';

export class DataService {
    arr = [1, 2, 3, 4, 5];

    getData(): any {
        return new Observable(observer => {
            this.arr.forEach(element => {
                observer.next(element);
            });
            observer.complete();
        });
    }
}


