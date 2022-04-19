import { off } from "process";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, switchMap } from "rxjs/operators";

export class LoadingHandler{
    
    private _isLoading$ = new BehaviorSubject(false);

    isLoading$: Observable<boolean> = this._isLoading$.pipe(
        switchMap(isLoading => {
            if(!isLoading){
                return of(false);
            }
            return of(true).pipe(delay(1000));            
        })
    );

    private timeout: any;
    isLoading =  false;

    start(){
        // this.timeout = setTimeout(() => {
        //     this.isLoading = true;
        // },3000);
        this._isLoading$.next(true);
    }

    finish(){
        // this.isLoading = true;
        // clearTimeout(this.timeout);
        this._isLoading$.next(false);
    }
}