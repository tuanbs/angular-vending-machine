import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceRepoService {
  private _dataStore: { balance: number };
  private _balanceBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  balanceObservable: Observable<number>;

  constructor(
  ) {
    this._dataStore = { balance: 0 };
    this.balanceObservable = this._balanceBehaviorSubject.asObservable();
  }

  addBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.balance += amount;
        this._balanceBehaviorSubject.next(this._dataStore.balance);
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }

  deductBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.balance -= amount;
        this._balanceBehaviorSubject.next(this._dataStore.balance);
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }
}
