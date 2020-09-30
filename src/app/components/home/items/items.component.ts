import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';
import { ItemRepoService } from 'src/app/shared/data/repositories/item-repo.service';
import { Item } from 'src/app/shared/models/item.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  private _balanceObservableSubscriber: Subscription;
  _items: Item[] = [];
  private _itemsObservableSubscriber: Subscription;
  _balance?: number = 0;

  constructor(
    private _balanceRepoService: BalanceRepoService,
    private _itemRepoService: ItemRepoService,
    private _notificationService: NotificationService,
  ) {
  }

  //#region Lifecycle.
  ngOnInit() {
    // Listeners.
    this._balanceObservableSubscriber = this._balanceRepoService.balanceObservable.subscribe(data => {
      this._balance = data;
    });
    this._itemsObservableSubscriber = this._itemRepoService.itemsObservable.subscribe(data => {
      this._items = JSON.parse(JSON.stringify(data));
    });

    this._getList();
  }

  ngOnDestroy() {
    if (this._itemsObservableSubscriber) { this._itemsObservableSubscriber.unsubscribe(); }
    if (this._balanceObservableSubscriber) { this._balanceObservableSubscriber.unsubscribe(); }
  }
  //#endregion.

  //#region Helpers.
  private _dispenseItem(dispensingItem: Item) {
    if (this._balance < dispensingItem.cost) {
      this._notificationService.showWarning('Insufficient balance. Please insert coin.', null);
      return;
    }
    if (dispensingItem.remaining <= 0) {
      this._notificationService.showWarning('No remaining inventory for this item. Please edit db.json to restock.', null);
      return;
    }

    dispensingItem.remaining -= 1;
    // Update the dispensingItem.
    let isOk = false, error = null;
    this._itemRepoService.updatePost(dispensingItem)
      .subscribe(() => { isOk = true; }, (err) => { error = err; })
      .add(() => {
        if (isOk) {
          this._notificationService.showSuccess(null, `Dispensed item ${dispensingItem.name} successfully. Enjoy your ${dispensingItem.name}.`)
          this._balanceRepoService.deductBalance(dispensingItem.cost)
            .subscribe(() => { }, (err) => { })
            .add(() => {});
        } else {
          this._notificationService.showError(error, `Dispensed item ${dispensingItem.name} failed.`);
        }
      });
  }

  private _getList(): void {
    let isOk = false,  error = null;
    
    this._itemRepoService.getList(null)
      .subscribe(() => { isOk = true; }, (err) => { error = err; })
      .add(() => {
        if (isOk) {
        } else {
          this._notificationService.showError(null, 'GET data failed.');
        }
      });
  }
  //#endregion.

  //#region Main methods.
  onSelectItem(itemParam: Item) {
    let foundItem = this._items.find(item => item.id == itemParam.id);
    if (foundItem) {
      this._dispenseItem(foundItem);
      // this._notificationService.showSuccess('Dispensing item: ' + foundItem.name, null);
    }
  }
  //#endregion.
}
