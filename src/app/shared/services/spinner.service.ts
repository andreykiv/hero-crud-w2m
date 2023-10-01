import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly isLoading$: Observable<boolean> =
    this._isLoading.asObservable();

  toggle(isLoading: boolean): void {
    this._isLoading.next(isLoading);
  }
}
