--------------------------------------------------

# How to make this app up and running.

Clone the app and cd to its root. Then run the following cmd:
```bash
npm install
npm start
```

Open your browser with the address: `http://localhost:4200`.

--------------------------------------------------

# Angular Vending Machine.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Requirements.

As a vendor, I want this machine accepts coins:
- It will accept coins only, no cash. Coins are represented by 4 buttons with different values `20c`, `50c`, `$1` and `$2`.
- When coin is inserted by pressing the buttons, the value will be added to the available balance. The machine will display the current balance when users insert coins or dispense the item (pressing the item button).

As a vendor, I want to see what the users can buy:
- The machine shows a list of item buttons (4) with their prices, name and remaining inventory.
- The list of items is stored in `db.json` file and returned to the app from `ItemRepoService`. This service users the local external API to return the list as well as dispense the item.
- Users buy the item by pressing the item button.

Dispense the item:
- When pressing the item button, the current balance will be deducted and the item's remaining stock reduced by 1 unit.
- If the available balance is not enough to buy the item, it will show `Insufficient balance` message. Also, if the remaining stock is 0, it will show `No inventory remaining` message.
- When item is dispensed, it will show the success message.

## Assumptions.

The vendor will restock the remaining inventory by editing the `db.json` file.

## Git flow.

When you finish adding new features or fixing issues, put your commit message in `git_commit_message.md` file and run the following cmd:
```bash
git add . && git commit -F git_commit_message.md && git push
```

When you want to release an app version, put your release version message in `git_tag_message.md` file and run the cmd `git tag -a v<version_number> --file=git_tag_message.md && git push origin --tags`. For example:
```bash
git tag -a v1.0.0 --file=git_tag_message.md && git push origin --tags
```