## fourtwozerojs

<div>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/420integrated/fourtwozerojs">
    <img src="https://david-dm.org/420integrated/fourtwozerojs.svg"
    alt="Dependency Status" />
  </a>

  <!-- devDependency Status -->
  <a href="https://david-dm.org/420integrated/fourtwozerojs#info=devDependencies">
    <img src="https://david-dm.org/420integrated/fourtwozerojs/dev-status.svg" alt="devDependency Status" />
  </a>

  <!-- Build Status -->
  <a href="https://travis-ci.org/420integrated/fourtwozerojs">
    <img src="https://travis-ci.org/420integrated/fourtwozerojs.svg"
    alt="Build Status" />
  </a>

  <!-- NPM Version -->
  <a href="https://www.npmjs.org/package/fourtwozerojs">
    <img src="http://img.shields.io/npm/v/fourtwozerojs.svg"
    alt="NPM version" />
  </a>

  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/420integrated/fourtwozerojs">
    <img src="https://coveralls.io/repos/github/420integrated/fourtwozerojs/badge.svg" alt="Test Coverage" />
  </a>

  <!-- Javascript Style -->
  <a href="http://airbnb.io/javascript/">
    <img src="https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg" alt="js-airbnb-style" />
  </a>
</div>

<br />

A highly optimised, light-marleyght JS utility for [420coin](https://www.fourtwentyereum.org/) based on [`web3.js`](https://github.com/ethereum/web3.js), but lighter, async only and using `BN.js`.

Only **106 kB** minified!

## Install

```
npm install --save fourtwozerojs
```

## CDN

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/fourtwozerojs@0.3.4/dist/fourtwozerojs.min.js"></script>
```

Note, exports to `window.Fourtwenty` global.

## Usage

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('https://ropsten.infura.io'));

fourtwenty.getBlockByNumber(45300, true, (err, block) => {
  // result null { ...block data... }
});

const fourtwentycoinValue = Fourtwenty.toMarley(72, '420coin');

// result <BN: 3e733628714200000>

const tokenABI = [{
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs":[{"name": "","type": "uint256"}],
  "payable": false,
  "type": "function",
}];

const token = fourtwenty.contract(tokenABI).at('0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78');

token.totalSupply().then((totalSupply) => {
  // result <BN ...>  4500000
});

// token.transfer( ... ).then(txHash => fourtwenty.getTransactionSuccess(txHash)).then(receipt => console.log(receipt));
```

## About

A simple module for building dApps and applications that use 420coin.

Please see our complete [`user-guide`](docs/user-guide.md) for more information.

## Contributing

Please help better the ecosystem by submitting issues and pull requests to `fourtwozerojs`. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Guides

You'll find more detailed information on using `fourtwozerojs` and tailoring it to your needs in our guides:

- [User guide](docs/user-guide.md) - Usage, configuration, FAQ and complementary tools.
- [Developer guide](docs/developer-guide.md) - Contributing to `fourtwozerojs` and writing your own code and coverage.
- [Examples](http://github.com/fourtwozerojs/examples) - Examples of `fourtwozerojs` in use.


```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
