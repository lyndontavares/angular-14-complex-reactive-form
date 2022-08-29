import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ControlTabService {

    private tabIndex = new BehaviorSubject(0)

    getTabIndex(): Observable<number> {
        return this.tabIndex.asObservable()
    }

    updateTabIndex(index: number) {
        this.tabIndex.next(index)
    }
}
