# Gilded Rose

This is the Gilded Rose kata in TypeScript.

This is copy project from <https://github.com/emilybache/GildedRose-Refactoring-Kata> and do some improve.

Design Improvements:
1. The legacy code is not readable and has tightly coupled logic. To address this, the code was refactored while preserving the original logic.
2. The design now accounts for future changes in 'Quality' and 'sellIn'.

## Getting started

Install dependencies

```sh
npm install
```

## Running app
_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests

### Jest way

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

### Mocha way

```sh
npm run test:mocha
```
