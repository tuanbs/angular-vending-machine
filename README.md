--------------------------------------------------

# How to make this app up and running.

Clone the app and cd to its root. Then run the following cmd:
```bash
npm install
npm start
```

Open your browser with the address: `http://localhost:4200`.

--------------------------------------------------

# AngularVendingMachine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Git flow.

When you finish adding new features or fixing issues, put your commit message in `git_commit_message.md` file and run the following cmd:
```bash
git add . && git commit -F git_commit_message.md && git push
```

When you want to release an app version, put your release version message in `git_tag_message.md` file and run the cmd `git tag -a v<version_number> --file=git_tag_message.md && git push origin --tags`. For example:
```bash
git tag -a v1.0.0 --file=git_tag_message.md && git push origin --tags
```