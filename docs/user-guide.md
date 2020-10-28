# User Guide

All information for developers using `fourtwozerojs` should consult this document.

## Install

```
npm install --save fourtwozerojs
```

## Usage

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('https://ropsten.infura.io'));

fourtwenty.getBlockByNumber(45300, (err, block) => {
  // result null { ...block data... }
});

const fourtwentycoinValue = Fourtwenty.toMarley(72, '420coin');

// result <BN ...>

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
```

## Welcome

Thank you for trying out `fourtwozerojs`! A highly optimized light-marleyght JS utiltity for 420coin based on `web3.js`, but lighter and using `BN.js`.

## Notice/Warning

`fourtwozerojs` is still in development and is highly experimental. Use at your own risk. While we test everything as against standards, specifications and existing test cases (layed out by both the community and the 420coin Foundation), this module is not ready for production use. More user testing is needed, so please, help out!

## Modules

`fourtwozerojs` is made from a series of smaller modules:

  - [`fourtwozerojs-query`](http://github.com/420integrated/fourtwozerojs-query) for querying the RPC layer
  - [`fourtwozerojs-format`](http://github.com/420integrated/fourtwozerojs-format) for formatting RPC payloads to and from the nodes
  - [`fourtwozerojs-contract`](http://github.com/420integrated/fourtwozerojs-contract) for handling contracts
  - [`fourtwozerojs-abi`](http://github.com/420integrated/fourtwozerojs-abi) for handling contract data encoding and decoding
  - [`fourtwozerojs-filter`](http://github.com/420integrated/fourtwozerojs-filter) for handling filters and events
  - [`fourtwozerojs-unit`](http://github.com/420integrated/fourtwozerojs-unit) for handling 420coin currency unit conversion
  - [`fourtwozerojs-util`](http://github.com/420integrated/fourtwozerojs-util) general utiltity methods
  - [`fourtwozerojs-provider-http`](http://github.com/420integrated/fourtwozerojs-provider-http) a simple XHR http provider

## Concepts

### dApps or Decentralized Apps

`fourtwozerojs` is primarily designed for building light-marleyght dApps or "Decentralized Applications" on 420coin. dApps are usually just some HTML/Javascript/CSS file(s) that interface with an 420coin node or client. They usually have little to no server architecture and are often just faces or light interfaces for one or many 420coin smart-contracts.

### Nodes

`fourtwozerojs` is meant to be a simple javascript interface for 420coin nodes and clients. If you are not running a node, we recommend using [TestRPC](https://github.com/fourtwentyjs/testrpc) (`npm install --save-dev fourtwentyjs-testrpc`), [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), [Mist](https://github.com/ethereum/mist/releases), or [Infura](https://www.infura.io/). A node or client is generally required to both access and use 420coin accounts, smart-contracts and the 420coin blockchain.

### Accounts

420coin uses [secp256k1]() (public/private) key pairs for its account system. An 420coin account address (e.g. `0xBd151ceB123dcba8C27Ad0769B8B9C11aFc69CC2`) is derived from the public key in the key pair. Both `accounts` and 420coin `smart-contracts` have addresses, but only accounts use key pairs. 420coin is sent to and from contracts or accounts via addresses.

For example, this `secp256k1` **private key**:
```
0xb82f69b82496716c8d63a41b1ae88017e720595477b0a5eeb835a8e46c3a13e6
```

Derives to this `secp256k1` **public key**:
```
0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3daa12198d9284fe7c0d9cbb2cf970d5997e642edb1373a9fbe48784c8
```

Which derives to this 420coin **address**:
```
0xBd151ceB123dcba8C27Ad0769B8B9C11aFc69CC2
```

See: [`fourtwozerojs-account`](https://github.com/420integrated/fourtwozerojs-account), [`fourtwenty-lightwallet`](https://github.com/ConsenSys/fourtwenty-lightwallet), or the [`420coin Whitepaper`](https://github.com/ethereum/wiki/wiki/White-Paper#fourtwentyereum) for more details.

Note, there is a **difference** between 420coin `checksum` addresses (i.e. `0xBd151ceB123dcba8C27Ad0769B8B9C11aFc69CC2`), and non-checksum addresses (i.e. `0xbd151ceb123dcba8c27ad0769b8b9c11afc69cc2`).

### 420coins/Smoke

420coins are the magical internet money that powers the 420coin ecosystem. Each base unit of 420coins (a marley) is worth some amount of computational processes on the 420coin world computer. Every transaction requires some amount of 420coin to send, because of this, we sometimes refer to 420coins as "smoke" or the "smoke amount". You generally have to specify a smoke amount when making any transaction with 420coin.

See: [`420coin Whitepaper`](https://github.com/ethereum/wiki/wiki/White-Paper#messages-and-transactions)

### Smart-Contracts

420coin contracts or `smart-contracts` are computational code stored on the 420coin blockchain. Contracts can be written in a higher level language like [Solidity](https://solidity.readthedocs.io/en/develop/) which then compiles down into EVM (420coin Virtual Machine) bytecode that can be stored on the chain. To use or deploy these contracts with `fourtwozerojs` you need the **ABI** and (if your deploying) the **bytecode** or (if your just using it) the **address**. Contracts can be designed to send and receive, process and store data and `ether` from other `accounts` or `contracts`. `fourtwozerojs` provides a `fourtwenty.contract` object to help you interact with and deploy 420coin contracts (its design is very similar to its `web3.js` counterpart).

See: [`Browser-Solidity`](https://ethereum.github.io/browser-solidity/) an in browser Solidity IDE for building contracts, [`Solidity Read The Docs`](https://solidity.readthedocs.io/en/develop/), [`fourtwozerojs-contract`](https://github.com/420integrated/fourtwozerojs-contract), [`420coin Whitepaper`](https://github.com/ethereum/wiki/wiki/White-Paper#applications). Note, this will actually provide you with the necessary contract `bytecode` and `ABI` required to deploy and use the contracts.

### Transactions/vs Calls

`fourtwozerojs` can both transact (attempt to change) and call (attempt to get information from) the blockchain. In order to send transactions, the raw transaction data must be signed by the secp256k1 private key of the account used, and some 420coin must be put up as "smoke" in order for it to be processed and added to the blockchain. Calls do not require any account or ether, and is simply just getting known information from the blockchain. Certain contract methods will require you to transact with them, while others are simply getters that you can call (usually refered to as "constant" methods).

See: [`420coin Whitepaper`](https://github.com/ethereum/wiki/wiki/White-Paper#messages-and-transactions), [`420coin RPC Specification`](https://github.com/ethereum/wiki/wiki/JSON-RPC#fourtwenty_sendtransaction).

### Testnet/Mainnet/Local

The 420coin (Fourtwenty) community runs two primary blockchains: a test network (testnet) called `ropsten` used to test contracts and transactions in a live (but not costly) setting and a main network (mainnet) called the 420coin "Mainnet" or "Livenet" used to make actual transactions and contracts. Usually, most developers like to design their contracts and apps locally, and will run a local private network. Local networks can also be run with tools like ["TestRPC"](https://github.com/fourtwentyjs/testrpc), ["go-ethereum"](https://github.com/ethereum/go-ethereum) on a private network or ["parity"](https://github.com/ethcore/parity) on a private network.

### Chain Services

There are many services available to help connect you or your app to the 420coin testnet or mainnet. [infura](https://www.infura.io/) is one constantly referenced by `fourtwozerojs` examples. Currently, it allows anyone to access its scalable node cluster for free over an HTTPS connection. You can connect to the infura testnet by using the [`HTTP provider`](https://github.com/420integrated/fourtwozerojs-provider-http) with the host set to either: `https://ropsten.infura.io` or mainnet by using `https://mainnet.infura.io`. Note, if you use infura, you need to do your own account handling and signing of transactions.

See: [`Infura.io`](https://www.infura.io/)

### Account Handling/Signing

Account handling and signing must be done carfully and with extreme caution. Note, if someone gains access to your private key, they can and most likely will steal all of your 420coins. Handling private keys is very dangerous and should be treated with extreme caution. Many nodes, clients and services (such as: [MetaMask], [uPort], [Geth], [Partiy], [Lightwallet] and others) help manage your keys and transaction signing for you.

See: [`420coin Whitepaper`](https://github.com/ethereum/wiki/wiki/White-Paper#fourtwentyereum-accounts).

### RPC

`fourtwozerojs` communicates with the 420coin nodes and clients via RPC (Remote Procedure Call) data payloads send to and from your dApp and the node. `fourtwozerojs` has complete 420coin RPC specification coverage, and tries to abstract very little past the specification. `fourtwozerojs` helps you format and build the data payloads that will be send and format payloads that are recieved by 420coin nodes. Usually, a provider is specified and then payloads can be transmitted between your dApp and the 420coin nodes.

See: [`420coin RPC Specification`](https://github.com/ethereum/wiki/wiki/JSON-RPC) for more details.

### Events/Filters

`fourtwozerojs` provides facility to manage events and filters. Filters are simple mechanisms to listen for changes on the blockchain. Contracts can also dispatch custom events.

See: [`fourtwozerojs-filter`](https://github.com/420integrated/fourtwozerojs-filter), [`420coin RPC Specification`](https://github.com/ethereum/wiki/wiki/JSON-RPC#fourtwenty_newfilter)

## Asynchronous Only

`fourtwozerojs` is completely async when handling data from any 420coin provider, node or client. All data methods require the use of either a callback or standard promise.

## Big Numbers/Number Handling

420coin uses very large numbers for handling currency amounts and number storage on the blockchain. The JVM (Javascript Virtual Machine) can only handle up to integer `9007199254740991` safely without loosing precision. Because of this, we have to use a module called `bn.js` to handle the very large numbers and amounts often used in 420coin. Note, [`bn.js`](https://github.com/indutny/bn.js) "BN" is not the same as [`bignumber.js`](https://github.com/MikeMcl/bignumber.js) "BigNumber" used by web3. They are two different libraries. We use [`bn.js`](https://github.com/indutny/bn.js) because it does not support any decimal numbers, and can manage absolute precision of large integers (this lib is also used by `fourtwentyjs`).

There are **no decimal numbers on the blockchain**. All numbers must be converted to integers and then to hex format for chain storage and use. You must be very careful when handling large numbers. When working with 420coin number values, try to avoid or never use actual Number type values (i.e. `value: 45038000000,`) or decimal numbers (`value: 1000.003`). This may lead to incorrect values conversion, number precision loss or worse, all your or your users ether!

Try to **always use `BN` Big Numbers** or if you have to strings. `fourtwozerojs` will attempt to convert your type `String` number into a BN properly, however, the best way is to always provide a type Object `BN` instance (e.g. `value: new Fourtwenty.BN('4000001'),` instead of `value: 4000001,`).

If you have to handle decimal amounts of value like `420coin` (e.g. `4500.302 420coin`), simply convert the value down to `marley` using the toMarley method (e.g. `Fourtwenty.toMarley('4500.302', '420coin')`) and then do your handling with BN.

The BN object comes equip with numerous mathamatical operators and methods.

### BN.js API

![alt-text](https://raw.githubusercontent.com/MikeMcl/bignumber.js/gh-pages/API.png "BN.js API")

## API Design

* [Fourtwenty.BN](#fourtwentybn)
* [Fourtwenty.isAddress](#fourtwentyisaddress)
* [Fourtwenty.keccak256](#fourtwentykeccak256)
* [Fourtwenty.isHexString](#fourtwentyishexstring)
* [Fourtwenty.fromMarley](#fourtwentyfrommarley)
* [Fourtwenty.toMarley](#fourtwentytomarley)
* [Fourtwenty.toBN](#fourtwentytobn)
* [Fourtwenty.fromAscii](#fourtwentyfromascii)
* [Fourtwenty.toAscii](#fourtwentytoascii)
* [Fourtwenty.fromUtf8](#fourtwentyfromutf8)
* [Fourtwenty.toUtf8](#fourtwentytoutf8)
* [Fourtwenty.HttpProvider](#fourtwentyhttpprovider)
* [fourtwenty.contract](#fourtwentycontract)
* [fourtwenty.filter](#fourtwentyfilter)
* [fourtwenty.web3_clientVersion](#fourtwentyweb3_clientversion)
* [fourtwenty.web3_sha3](#fourtwentyweb3_sha3)
* [fourtwenty.net_version](#fourtwentynet_version)
* [fourtwenty.net_peerCount](#fourtwentynet_peercount)
* [fourtwenty.net_listening](#fourtwentynet_listening)
* [fourtwenty.protocolVersion](#fourtwentyprotocolversion)
* [fourtwenty.syncing](#fourtwentysyncing)
* [fourtwenty.coinbase](#fourtwentycoinbase)
* [fourtwenty.mining](#fourtwentymining)
* [fourtwenty.hashrate](#fourtwentyhashrate)
* [fourtwenty.smokePrice](#fourtwentysmokeprice)
* [fourtwenty.accounts](#fourtwentyaccounts)
* [fourtwenty.blockNumber](#fourtwentyblocknumber)
* [fourtwenty.getBalance](#fourtwentygetbalance)
* [fourtwenty.getStorageAt](#fourtwentygetstorageat)
* [fourtwenty.getTransactionCount](#fourtwentygettransactioncount)
* [fourtwenty.getBlockTransactionCountByHash](#fourtwentygetblocktransactioncountbyhash)
* [fourtwenty.getBlockTransactionCountByNumber](#fourtwentygetblocktransactioncountbynumber)
* [fourtwenty.getUncleCountByBlockHash](#fourtwentygetunclecountbyblockhash)
* [fourtwenty.getUncleCountByBlockNumber](#fourtwentygetunclecountbyblocknumber)
* [fourtwenty.getCode](#fourtwentygetcode)
* [fourtwenty.sign](#fourtwentysign)
* [fourtwenty.sendTransaction](#fourtwentysendtransaction)
* [fourtwenty.sendRawTransaction](#fourtwentysendrawtransaction)
* [fourtwenty.call](#fourtwentycall)
* [fourtwenty.estimateSmoke](#fourtwentyestimatesmoke)
* [fourtwenty.getBlockByHash](#fourtwentygetblockbyhash)
* [fourtwenty.getBlockByNumber](#fourtwentygetblockbynumber)
* [fourtwenty.getTransactionByHash](#fourtwentygettransactionbyhash)
* [fourtwenty.getTransactionByBlockHashAndIndex](#fourtwentygettransactionbyblockhashandindex)
* [fourtwenty.getTransactionByBlockNumberAndIndex](#fourtwentygettransactionbyblocknumberandindex)
* [fourtwenty.getTransactionReceipt](#fourtwentygettransactionreceipt)
* [fourtwenty.getUncleByBlockHashAndIndex](#fourtwentygetunclebyblockhashandindex)
* [fourtwenty.getUncleByBlockNumberAndIndex](#fourtwentygetunclebyblocknumberandindex)
* [fourtwenty.getCompilers](#fourtwentygetcompilers)
* [fourtwenty.compileLLL](#fourtwentycompilelll)
* [fourtwenty.compileSolidity](#fourtwentycompilesolidity)
* [fourtwenty.compileSerpent](#fourtwentycompileserpent)
* [fourtwenty.newFilter](#fourtwentynewfilter)
* [fourtwenty.newBlockFilter](#fourtwentynewblockfilter)
* [fourtwenty.newPendingTransactionFilter](#fourtwentynewpendingtransactionfilter)
* [fourtwenty.uninstallFilter](#fourtwentyuninstallfilter)
* [fourtwenty.getFilterChanges](#fourtwentygetfilterchanges)
* [fourtwenty.getFilterLogs](#fourtwentygetfilterlogs)
* [fourtwenty.getLogs](#fourtwentygetlogs)
* [fourtwenty.getWork](#fourtwentygetwork)
* [fourtwenty.submitWork](#fourtwentysubmitwork)
* [fourtwenty.submitHashrate](#fourtwentysubmithashrate)
* [fourtwenty.db_putString](#fourtwentydb_putstring)
* [fourtwenty.db_getString](#fourtwentydb_getstring)
* [fourtwenty.db_putHex](#fourtwentydb_puthex)
* [fourtwenty.db_getHex](#fourtwentydb_gethex)
* [fourtwenty.shh_post](#fourtwentyshh_post)
* [fourtwenty.shh_version](#fourtwentyshh_version)
* [fourtwenty.shh_newIdentity](#fourtwentyshh_newidentity)
* [fourtwenty.shh_hasIdentity](#fourtwentyshh_hasidentity)
* [fourtwenty.shh_newGroup](#fourtwentyshh_newgroup)
* [fourtwenty.shh_addToGroup](#fourtwentyshh_addtogroup)
* [fourtwenty.shh_newFilter](#fourtwentyshh_newfilter)
* [fourtwenty.shh_uninstallFilter](#fourtwentyshh_uninstallfilter)
* [fourtwenty.shh_getFilterChanges](#fourtwentyshh_getfilterchanges)
* [fourtwenty.shh_getMessages](#fourtwentyshh_getmessages)

### fourtwenty.contract

[index.js:fourtwozerojs-contract](../../../blob/master/src/index.js "Source code on GitHub")

Intakes the contract 420coin standard ABI schema, optionally the contract bytecode and default transaction object. Outputs a `ContractFactory` instance for the contract.

**Parameters**

-   `abi` **Array** a single 420coin standard contract ABI array
-   `bytecode` **String** [optional] the contract bytecode as a single alphanumeric hex string
-   `defaultTxObject` **Object** [optional] a single default transaction object

Result `ContractFactory` **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

// the abi
const SimpleStoreABI = JSON
.parse('[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]');

// bytecode
const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

fourtwenty.accounts().then((accounts) => {
  const SimpleStore = fourtwenty.contract(SimpleStoreABI, SimpleStoreBytecode, {
    from: accounts[0],
    smoke: 300000,
  });

  // create a new contract
  const simpleStore = SimpleStore.new((error, result) => {
    // result null '0x928sdfk...' (i.e. the transaction hash)
  });

  // setup an instance of that contract
  const simpleStore = SimpleStore.at('0x000...');
});
```

### ContractFactory.new

[index.js:fourtwozerojs-contract](../../../blob/master/src/index.js "Source code on GitHub")

The contract factory has two methods, 'at' and 'new' which can be used to create the contract instance. The `at` method is used to create a `Contract` instance for a contract that has already been deployed to the 420coin blockchain (testnet, livenet, local or otherwise). The `new` method is used to deploy the contract to the current chain.

**Parameters**

-   [`params`] **Various** the contract constructor input paramaters, if any have been specified, these can be of various types, lengths and requirements depending on the contract constructor.
-   `txObject` **Object** [optional] a web3 standard transaciton JSON object
-   `callback` **Function** [optional] a standard async callback which is fired when the contract has either been created or the transaction has failed.

Result a single Promise **Object** instance.


```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

// the abi
const SimpleStoreABI = JSON
.parse('[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]');

// bytecode
const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

fourtwenty.accounts().then((accounts) => {
  const SimpleStore = fourtwenty.contract(SimpleStoreABI, SimpleStoreBytecode, {
    from: accounts[0],
    smoke: 300000,
  });

  // create a new contract
  SimpleStore.new((error, result) => {
    // result null '0x928sdfk...' (i.e. the transaction hash)
  });
});
```

### ContractFactory.at

[index.js:fourtwozerojs-contract](../../../blob/master/src/index.js "Source code on GitHub")

The contract factory has two methods, 'at' and 'new' which can be used to create the `Contract` instance.

**Parameters**

-   `address` **String** a single 20 byte alphanumeric hex string contract address

Result a single `Contract` **Object** instance.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

// the abi
const SimpleStoreABI = JSON
.parse('[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]');

// bytecode
const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

fourtwenty.accounts().then((accounts) => {
  const SimpleStore = fourtwenty.contract(SimpleStoreABI, SimpleStoreBytecode, {
    from: accounts[0],
    smoke: 300000,
  });

  // setup an instance of that contract
  const simpleStore = SimpleStore.at('0x000...');

  // use a method that comes with the contract
  simpleStore.set(45).then((txHash) => {
    console.log(txHash);
  });
});
```

### Contract (Instance)

[index.js:fourtwozerojs-contract](../../../blob/master/src/index.js "Source code on GitHub")

The contract instance is meant to simulate a deployed 420coin contract interface as a javascript object. All specified call methods are attached to this object (as specified by the contract ABI schema array).

In the example below, the SimpleStore contract has methods `set`, `get`, `constructor` and `SetComplete`.

The `get` method is flagged as `constant`, which means it will not make changes to the blockchain. It is purely for getting information from the chain.

However, the `set` method is not constant, which means it can be transacted with and change the blockchain.

The `constructor` method is only used when deploying the contract, i.e. when `.new` is used.

In this contract, the `SetComplete` event is fired when the `set` method has set a new value successfully.

You will notice the `simpleStore` instance makes all these methods available to it.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

// the abi
const SimpleStoreABI = JSON
.parse('[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]');

// bytecode
const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

fourtwenty.accounts().then((accounts) => {
  const SimpleStore = fourtwenty.contract(SimpleStoreABI, SimpleStoreBytecode, {
    from: accounts[0],
    smoke: 300000,
  });

  // setup an instance of that contract
  const simpleStore = SimpleStore.at('0x000...');

  simpleStore.set(45000, (error, result) => {
    // result null '0x2dfj24...'
  });

  simpleStore.get().catch((error) => {
    // error null
  }).then(result) => {
    // result <BigNumber ...>
  });

  const filter = simpleStore.SetComplete().new((error, result) => {
    // result null <BigNumber ...> filterId
  });
  filter.watch().then((result) => {
    // result null FilterResult {...} (will only fire once)
  });
  filter.uninstall((error, result) => {
    // result null Boolean filterUninstalled
  });
});
```

### Fourtwenty.toMarley

[index.js:fourtwozerojs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a single 420coin denominated value at a specified unit, and convert it to its `marley` value. Intakes a `value` and `unit` specifier, outputs a single marley value `BN` object.

**Parameters**

-   `value` **Object|Number|String** a single number `marley` value as a integer, BN.js object instance, string hex integer, BN.js object instance (no decimals)
-   `unit` **String** the unit to covert to (i.e. `maher`, `420coin` etc..)

Result output single BN **Object**.

```js
const Fourtwenty = require('fourtwozerojs');

var val1 = Fourtwenty.toMarley(249824778, '420coin');

// result <BN ...> [.toString(10) : 249824778000000000000000000]
```

### Fourtwenty.fromMarley

[index.js:fourtwozerojs-unit](../../../blob/master/src/index.js "Source code on GitHub")

Convert a marley denominated value into another 420coin denomination. Intakes a single marley `value` and outputs a BN object.

**Parameters**

-   `value` **Object|Number|String** a single number 420coin denominated value
-   `unit` **String** the unit to covert to (i.e. `maher`, `420coin` etc..)

Result output single **String** number.

```js
const Fourtwenty = require('fourtwozerojs');

var val1 = Fourtwenty.fromMarley(249824778000000000000000000, '420coin');

// result '249824778'
```

### Fourtwenty.HttpProvider

[index.js:fourtwozerojs-provider-http](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a `provider` URL specified as a string, and optionally the `timeout` specified as a Number, outputs a web3 standard `HttpProvider` object.

**Parameters**

-   `provider` **String** the URL path to your local Http RPC enabled 420coin node (e.g. `http://localhost:6174`) or a service node system like [Infura.io](http://infura.io) (e.g. `http://ropsten.infura.io`).
-   `timeout` **Number** [optional] the time in seconds that an XHR2 request will wait until it times out.

Result `HttpProvider` **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.accounts((err, result) => {
  // result null ['0xd89b8a74c153f0626497bc4a531f702...', ...]
});
```

### Fourtwenty.keccak256

[index.js:keccak256](../../../blob/master/src/index.js "Source code on GitHub")

Intakes a single string and outputs a 32 byte (66 utf-8 byte) sha3 Keccak hex string or optionally a Buffer object.

**Parameters**

-   `input` **String** a single input string

Result output hex **String**.

```js
const Fourtwenty = require('fourtwozerojs');

console.log(Fourtwenty.keccak256('skfjksdfjksdjksd'));

// result 0x2b30820856594159b8ed9a26609193526e944a1a748eb7d493beac83911dd848
```

### fourtwenty.filter

[index.js:filter](../../../blob/master/src/index.js "Source code on GitHub")

Used to manage 420coin event listening and filtering.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new HttpProvider('http://localhost:6174'));

const filter = new fourtwenty.filters.Filter({ delay: 300 })
.new({ toBlock: 500 })
.then((result) => {
  // result <BigNumber ...> filterId
})
.catch((error) => {
  // result null
});
filter.watch((result) => {
  // result [{...}, ...] (fires multiple times)
});
filter.uninstall(cb);


const filter = new fourtwenty.filters.BlockFilter()
.at(7)
filter.watch((result) => {
  // result [{...}, ...] (fires multiple times)
});
filter.uninstall(cb);


const filter = new fourtwenty.filters.PendingTransactionFilter()
.new()
.then((result) => {
  // result <BigNumber ...> filterId
})
.catch((error) => {
  // result null
});

const watcher = filter.watch((error, result) => {
  // result null ['0xfd234829...', '0xsf2030d1...']
});
watcher.stopWatching(cb);

filter.uninstall()
.then((result) => {
  // result true
})
.catch((error) => {
  // result null
});
```

### fourtwenty.web3_clientVersion

[index.js:web3_clientVersion](../../../blob/master/src/index.js Source code on GitHub")

The web3 client version.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.web3_clientVersion()
.then((result) => {
  /*
  // result

  "0.1.6"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.web3_sha3

[index.js:web3_sha3](../../../blob/master/src/index.js Source code on GitHub")

The keccak 256 sha3 hash of the data.

**Parameters**

-   `data_0` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.web3_sha3("0.1.6")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.net_version

[index.js:net_version](../../../blob/master/src/index.js Source code on GitHub")

The net version from the node.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.net_version()
.then((result) => {
  /*
  // result

  "0.1.6"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.net_peerCount

[index.js:net_peerCount](../../../blob/master/src/index.js Source code on GitHub")

The total network peer count of the node.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.net_peerCount()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.net_listening

[index.js:net_listening](../../../blob/master/src/index.js Source code on GitHub")

Is the node listening to the network.

**Parameters**

none.

Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.net_listening()
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.protocolVersion

[index.js:fourtwenty_protocolVersion](../../../blob/master/src/index.js Source code on GitHub")

Returns the current 420coin protocol version.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.protocolVersion()
.then((result) => {
  /*
  // result

  "0.1.6"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.syncing

[index.js:fourtwenty_syncing](../../../blob/master/src/index.js Source code on GitHub")

Returns an object with data about the sync status or 'false'.

**Parameters**

none.

Result **"Boolean|FourtwentySyncing"**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.syncing()
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.coinbase

[index.js:fourtwenty_coinbase](../../../blob/master/src/index.js Source code on GitHub")

Returns the client coinbase address.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.coinbase()
.then((result) => {
  /*
  // result

  "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.mining

[index.js:fourtwenty_mining](../../../blob/master/src/index.js Source code on GitHub")

Returns 'true' if client is actively mining new blocks.

**Parameters**

none.

Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.mining()
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.hashrate

[index.js:fourtwenty_hashrate](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of hashes per second that the node is mining with.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.hashrate()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.smokePrice

[index.js:fourtwenty_smokePrice](../../../blob/master/src/index.js Source code on GitHub")

Returns the current price per smoke in marley.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.smokePrice()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.accounts

[index.js:fourtwenty_accounts](../../../blob/master/src/index.js Source code on GitHub")

Returns a list of addresses owned by client.

**Parameters**

none.

Result an **Array** of strings.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.accounts()
.then((result) => {
  /*
  // result

  ["0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78"]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.blockNumber

[index.js:fourtwenty_blockNumber](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of most recent block.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.blockNumber()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getBalance

[index.js:fourtwenty_getBalance](../../../blob/master/src/index.js Source code on GitHub")

Returns the balance of the account of given address.

**Parameters**

-   `address_0` **String** -- A 20 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getBalance("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78", <BN ...>)
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getStorageAt

[index.js:fourtwenty_getStorageAt](../../../blob/master/src/index.js Source code on GitHub")

Returns the value from a storage position at a given address.

**Parameters**

-   `address_0` **String** -- A 20 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity.
-   `number_2` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getStorageAt("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78", <BN ...>, <BN ...>)
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getTransactionCount

[index.js:fourtwenty_getTransactionCount](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of transactions *sent* from an address.

**Parameters**

-   `address_0` **String** -- A 20 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getTransactionCount("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78", <BN ...>)
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getBlockTransactionCountByHash

[index.js:fourtwenty_getBlockTransactionCountByHash](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of transactions in a block from a block matching the given block hash.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getBlockTransactionCountByHash("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getBlockTransactionCountByNumber

[index.js:fourtwenty_getBlockTransactionCountByNumber](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of transactions in a block from a block matching the given block number.

**Parameters**

-   `number_0` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getBlockTransactionCountByNumber(<BN ...>)
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getUncleCountByBlockHash

[index.js:fourtwenty_getUncleCountByBlockHash](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of uncles in a block from a block matching the given block hash.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getUncleCountByBlockHash("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getUncleCountByBlockNumber

[index.js:fourtwenty_getUncleCountByBlockNumber](../../../blob/master/src/index.js Source code on GitHub")

Returns the number of uncles in a block from a block matching the given block number.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getUncleCountByBlockNumber(<BN ...>)
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getCode

[index.js:fourtwenty_getCode](../../../blob/master/src/index.js Source code on GitHub")

Returns code at a given address.

**Parameters**

-   `address_0` **String** -- A 20 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getCode("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78", <BN ...>)
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.sign

[index.js:fourtwenty_sign](../../../blob/master/src/index.js Source code on GitHub")

Signs data with a given address.

**Parameters**

-   `address_0` **String** -- A 20 byte prefixed alphanumeric hex string.
-   `hash_1` **String** -- A 32 byte prefixed alphanumeric hex string.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.sign("0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78", "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.sendTransaction

[index.js:fourtwenty_sendTransaction](../../../blob/master/src/index.js Source code on GitHub")

Creates new message call transaction or a contract creation, if the data field contains code.

**Parameters**

-   `object_0` **Object** -- A raw transaction object.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.sendTransaction({
  from: '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78',
  to: '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78',
  value: '45000000',
  smoke: '3000000',
  data: '0x',
})
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.sendRawTransaction

[index.js:fourtwenty_sendRawTransaction](../../../blob/master/src/index.js Source code on GitHub")

Creates new message call transaction or a contract creation for signed transactions.

**Parameters**

-   `data_0` **String** -- Hexified bytes data of an undefined length.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.sendRawTransaction("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.call

[index.js:fourtwenty_call](../../../blob/master/src/index.js Source code on GitHub")

Executes a new message call immediately without creating a transaction on the block chain.

**Parameters**

-   `object_0` **Object** -- A call transaction object.
-   `number_1` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.call({
  from: '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78',
  to: '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78',
  value: '45000000',
  smoke: '3000000',
  data: '0x',
}, <BN ...>)
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.estimateSmoke

[index.js:fourtwenty_estimateSmoke](../../../blob/master/src/index.js Source code on GitHub")

Makes a call or transaction, which won't be added to the blockchain and returns the used smoke, which can be used for estimating the used smoke.

**Parameters**

-   `object_0` **Object** -- An estimate transaction object.
-   `number_1` **BN** -- A number quantity or tag (i.e. "earliest", "latest").


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.estimateSmoke({
  from: '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78',
  value: '0',
  smoke: '30000',
  data: '0x',
}, <BN ...>)
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getBlockByHash

[index.js:fourtwenty_getBlockByHash](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a block by hash.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.
-   `bool_1` **Boolean** -- A boolean value "true" or "false".


Result Block **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getBlockByHash("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45", true)
.then((result) => {
  /*
  // result

  {
    "number": <BN ...>,
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "parentHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "sha3Uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "logsBloom": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "transactionsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "stateRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "receiptsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "miner": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "difficulty": <BN ...>,
    "totalDifficulty": <BN ...>,
    "extraData": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "size": <BN ...>,
    "smokeLimit": <BN ...>,
    "smokeUsed": <BN ...>,
    "timestamp": <BN ...>,
    "transactions": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getBlockByNumber

[index.js:fourtwenty_getBlockByNumber](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a block by block number.

**Parameters**

-   `number_0` **BN** -- A number quantity or tag (i.e. "earliest", "latest").
-   `bool_1` **Boolean** -- A boolean value "true" or "false".


Result Block **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getBlockByNumber(<BN ...>, true)
.then((result) => {
  /*
  // result

  {
    "number": <BN ...>,
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "parentHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "sha3Uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "logsBloom": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "transactionsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "stateRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "receiptsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "miner": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "difficulty": <BN ...>,
    "totalDifficulty": <BN ...>,
    "extraData": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "size": <BN ...>,
    "smokeLimit": <BN ...>,
    "smokeUsed": <BN ...>,
    "timestamp": <BN ...>,
    "transactions": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getTransactionByHash

[index.js:fourtwenty_getTransactionByHash](../../../blob/master/src/index.js Source code on GitHub")

Returns the information about a transaction requested by transaction hash.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.


Result Transaction **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getTransactionByHash("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  {
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": <BN ...>,
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "transactionIndex": <BN ...>,
    "from": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "to": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "value": <BN ...>,
    "smokePrice": <BN ...>,
    "smoke": <BN ...>,
    "input": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getTransactionByBlockHashAndIndex

[index.js:fourtwenty_getTransactionByBlockHashAndIndex](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a transaction by block hash and transaction index position.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity.


Result Transaction **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getTransactionByBlockHashAndIndex("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45", <BN ...>)
.then((result) => {
  /*
  // result

  {
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": <BN ...>,
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "transactionIndex": <BN ...>,
    "from": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "to": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "value": <BN ...>,
    "smokePrice": <BN ...>,
    "smoke": <BN ...>,
    "input": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getTransactionByBlockNumberAndIndex

[index.js:fourtwenty_getTransactionByBlockNumberAndIndex](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a transaction by block number and transaction index position.

**Parameters**

-   `number_0` **BN** -- A number quantity or tag (i.e. "earliest", "latest").
-   `number_1` **BN** -- A number quantity.


Result Transaction **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getTransactionByBlockNumberAndIndex(<BN ...>, <BN ...>)
.then((result) => {
  /*
  // result

  {
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": <BN ...>,
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "transactionIndex": <BN ...>,
    "from": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "to": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "value": <BN ...>,
    "smokePrice": <BN ...>,
    "smoke": <BN ...>,
    "input": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getTransactionReceipt

[index.js:fourtwenty_getTransactionReceipt](../../../blob/master/src/index.js Source code on GitHub")

Returns the receipt of a transaction by transaction hash.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.


Result receipt **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getTransactionReceipt("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  {
    "transactionHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "transactionIndex": <BN ...>,
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "cumulativeSmokeUsed": <BN ...>,
    "smokeUsed": <BN ...>,
    "contractAddress": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "logs": {
    logIndex: <BN ...1>,
      blockNumber: <BN ...43533>,
      blockHash: "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
      transactionHash:  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
      transactionIndex: <BN ...0>,
      address: "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
      data:"0x0000000000000000000000000000000000000000000000000000000000000000",
      topics: ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    }
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getUncleByBlockHashAndIndex

[index.js:fourtwenty_getUncleByBlockHashAndIndex](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a uncle of a block by hash and uncle index position.

**Parameters**

-   `hash_0` **String** -- A 32 byte prefixed alphanumeric hex string.
-   `number_1` **BN** -- A number quantity.


Result Block **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getUncleByBlockHashAndIndex("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45", <BN ...>)
.then((result) => {
  /*
  // result

  {
    "number": <BN ...>,
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "parentHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "sha3Uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "logsBloom": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "transactionsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "stateRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "receiptsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "miner": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "difficulty": <BN ...>,
    "totalDifficulty": <BN ...>,
    "extraData": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "size": <BN ...>,
    "smokeLimit": <BN ...>,
    "smokeUsed": <BN ...>,
    "timestamp": <BN ...>,
    "transactions": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getUncleByBlockNumberAndIndex

[index.js:fourtwenty_getUncleByBlockNumberAndIndex](../../../blob/master/src/index.js Source code on GitHub")

Returns information about a uncle of a block by number and uncle index position.

**Parameters**

-   `number_0` **BN** -- A number quantity or tag (i.e. "earliest", "latest").
-   `number_1` **BN** -- A number quantity.


Result Block **Object**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getUncleByBlockNumberAndIndex(<BN ...>, <BN ...>)
.then((result) => {
  /*
  // result

  {
    "number": <BN ...>,
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "parentHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "nonce": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "sha3Uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "logsBloom": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "transactionsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "stateRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "receiptsRoot": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "miner": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "difficulty": <BN ...>,
    "totalDifficulty": <BN ...>,
    "extraData": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "size": <BN ...>,
    "smokeLimit": <BN ...>,
    "smokeUsed": <BN ...>,
    "timestamp": <BN ...>,
    "transactions": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "uncles": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getCompilers

[index.js:fourtwenty_getCompilers](../../../blob/master/src/index.js Source code on GitHub")

Returns a list of available compilers in the client.

**Parameters**

none.

Result an **Array** of strings.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getCompilers()
.then((result) => {
  /*
  // result

  ["0.1.6"]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.compileLLL

[index.js:fourtwenty_compileLLL](../../../blob/master/src/index.js Source code on GitHub")

Returns compiled LLL code.

**Parameters**

-   `data_0` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.compileLLL("0.1.6")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.compileSolidity

[index.js:fourtwenty_compileSolidity](../../../blob/master/src/index.js Source code on GitHub")

Returns compiled solidity code.

**Parameters**

-   `data_0` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.compileSolidity("0.1.6")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.compileSerpent

[index.js:fourtwenty_compileSerpent](../../../blob/master/src/index.js Source code on GitHub")

Returns compiled serpent code.

**Parameters**

-   `data_0` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.compileSerpent("0.1.6")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.newFilter

[index.js:fourtwenty_newFilter](../../../blob/master/src/index.js Source code on GitHub")

Creates a filter object, based on filter options, to notify when the state changes (logs).

**Parameters**

-   `object_0` **Object** -- An event filter object.


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.newFilter({
  fromBlock: '1',
  toBlock: new Fourtwenty.BN('45'),
  address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
  topics: ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', null],
})
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.newBlockFilter

[index.js:fourtwenty_newBlockFilter](../../../blob/master/src/index.js Source code on GitHub")

Creates a filter in the node, to notify when a new block arrives.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.newBlockFilter()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.newPendingTransactionFilter

[index.js:fourtwenty_newPendingTransactionFilter](../../../blob/master/src/index.js Source code on GitHub")

Creates a filter in the node, to notify when new pending transactions arrive.

**Parameters**

none.

Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.newPendingTransactionFilter()
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.uninstallFilter

[index.js:fourtwenty_uninstallFilter](../../../blob/master/src/index.js Source code on GitHub")

Uninstalls a filter with given id. Should always be called when watch is no longer needed.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.uninstallFilter(<BN ...>)
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getFilterChanges

[index.js:fourtwenty_getFilterChanges](../../../blob/master/src/index.js Source code on GitHub")

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result an **Array** of filter change objects..

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getFilterChanges(<BN ...>)
.then((result) => {
  /*
  // result

  [{
    "removed": true,
    "logIndex": <BN ...>,
    "transactionIndex": <BN ...>,
    "transactionHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "address": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "data": "0xce3f4596cbd1514f446ef8a306403354f53cb4aa9508a6440b6f93d8bccba3a1",
    "topics": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getFilterLogs

[index.js:fourtwenty_getFilterLogs](../../../blob/master/src/index.js Source code on GitHub")

Returns an array of all logs matching filter with given id.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result an **Array** of filter change objects..

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getFilterLogs(<BN ...>)
.then((result) => {
  /*
  // result

  [{
    "removed": true,
    "logIndex": <BN ...>,
    "transactionIndex": <BN ...>,
    "transactionHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "address": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "data": "0xce3f4596cbd1514f446ef8a306403354f53cb4aa9508a6440b6f93d8bccba3a1",
    "topics": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getLogs

[index.js:fourtwenty_getLogs](../../../blob/master/src/index.js Source code on GitHub")

Returns an array of all logs matching a given filter object.

**Parameters**

-   `object_0` **Object** -- An event filter object.


Result **Array**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getLogs({
  fromBlock: '1',
  toBlock: new Fourtwenty.BN('45'),
  address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
  topics: ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', null],
})
.then((result) => {
  /*
  // result

  [{
    "removed": true,
    "logIndex": <BN ...>,
    "transactionIndex": <BN ...>,
    "transactionHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockHash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45",
    "blockNumber": <BN ...>,
    "address": "0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78",
    "data": "0xce3f4596cbd1514f446ef8a306403354f53cb4aa9508a6440b6f93d8bccba3a1",
    "topics": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  }]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.getWork

[index.js:fourtwenty_getWork](../../../blob/master/src/index.js Source code on GitHub")

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

**Parameters**

none.

Result an **Array** of strings.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.getWork()
.then((result) => {
  /*
  // result

  ["0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.submitWork

[index.js:fourtwenty_submitWork](../../../blob/master/src/index.js Source code on GitHub")

Used for submitting a proof-of-work solution.

**Parameters**

-   `data_0` **String** -- Hexified bytes data of an undefined length.
-   `hash_1` **String** -- A 32 byte prefixed alphanumeric hex string.
-   `hash_2` **String** -- A 32 byte prefixed alphanumeric hex string.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.submitWork("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3", "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45", "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbab45")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.submitHashrate

[index.js:fourtwenty_submitHashrate](../../../blob/master/src/index.js Source code on GitHub")

Used for submitting mining hashrate.

**Parameters**

-   `data_0` **String** -- Hexified bytes data of an undefined length.
-   `data_1` **String** -- Hexified bytes data of an undefined length.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.submitHashrate("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3", "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.db_putString

[index.js:db_putString](../../../blob/master/src/index.js Source code on GitHub")

Stores a string in the local database.

**Parameters**

-   `data_0` **String** -- String data.
-   `data_1` **String** -- String data.
-   `data_2` **String** -- String data.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.db_putString("0.1.6", "0.1.6", "0.1.6")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.db_getString

[index.js:db_getString](../../../blob/master/src/index.js Source code on GitHub")

Returns string from the local database.

**Parameters**

-   `data_0` **String** -- String data.
-   `data_1` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.db_getString("0.1.6", "0.1.6")
.then((result) => {
  /*
  // result

  "0.1.6"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.db_putHex

[index.js:db_putHex](../../../blob/master/src/index.js Source code on GitHub")

Stores binary data in the local database.

**Parameters**

-   `data_0` **String** -- String data.
-   `data_1` **String** -- String data.
-   `data_2` **String** -- Hexified bytes data of an undefined length.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.db_putHex("0.1.6", "0.1.6", "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.db_getHex

[index.js:db_getHex](../../../blob/master/src/index.js Source code on GitHub")

Returns binary data from the local database.

**Parameters**

-   `data_0` **String** -- String data.
-   `data_1` **String** -- String data.


Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.db_getHex("0.1.6", "0.1.6")
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_post

[index.js:shh_post](../../../blob/master/src/index.js Source code on GitHub")

Sends a whisper message.

**Parameters**

-   `object_0` **Object** -- An SHH post object.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_post({
  from: '0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1',
  to: '0x3e245533f97284d442460f2998cd41858798ddf04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a0d4d661997d3940272b717b1',
  topics: ['0x776869737065722d636861742d636c69656e74', '0x4d5a695276454c39425154466b61693532'],
  payload: '0x7b2274797065223a226d6',
  priority: '65',
  ttl: '80',
})
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_version

[index.js:shh_version](../../../blob/master/src/index.js Source code on GitHub")

Returns the current whisper protocol version.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_version()
.then((result) => {
  /*
  // result

  "0.1.6"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_newIdentity

[index.js:shh_newIdentity](../../../blob/master/src/index.js Source code on GitHub")

Creates new whisper identity in the client.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_newIdentity()
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_hasIdentity

[index.js:shh_hasIdentity](../../../blob/master/src/index.js Source code on GitHub")

Checks if the client hold the private keys for a given identity.

**Parameters**

-   `data_0` **String** -- Hexified bytes data of an undefined length.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_hasIdentity("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_newGroup

[index.js:shh_newGroup](../../../blob/master/src/index.js Source code on GitHub")

Creates a new SHH group.

**Parameters**

none.

Result **String**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_newGroup()
.then((result) => {
  /*
  // result

  "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3"
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_addToGroup

[index.js:shh_addToGroup](../../../blob/master/src/index.js Source code on GitHub")

Adds an identity to an SHH group.

**Parameters**

-   `data_0` **String** -- Hexified bytes data of an undefined length.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_addToGroup("0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3")
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_newFilter

[index.js:shh_newFilter](../../../blob/master/src/index.js Source code on GitHub")

Creates filter to notify, when client receives whisper message matching the filter options.

**Parameters**

-   `object_0` **Object** -- An SHH filter object.


Result **BN**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_newFilter({
   topics: ['0x12341234bf4b564f'],
   to: '0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1'
})
.then((result) => {
  /*
  // result

  <BN ...>
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_uninstallFilter

[index.js:shh_uninstallFilter](../../../blob/master/src/index.js Source code on GitHub")

Uninstalls a filter with given id. Should always be called when watch is no longer needed.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result **Boolean**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_uninstallFilter(<BN ...>)
.then((result) => {
  /*
  // result

  true
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_getFilterChanges

[index.js:shh_getFilterChanges](../../../blob/master/src/index.js Source code on GitHub")

Polling method for whisper filters. Returns new messages since the last call of this method.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result **["SHHFilterChange"]**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_getFilterChanges(<BN ...>)
.then((result) => {
  /*
  // result

  [{
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "from": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "to": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "expiry": <BN ...>,
    "ttl": <BN ...>,
    "sent": <BN ...>,
    "topics": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "payload": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "workProved": <BN ...>
  }]
  */
})
.catch((error) => {
  // null
});
```


### fourtwenty.shh_getMessages

[index.js:shh_getMessages](../../../blob/master/src/index.js Source code on GitHub")

Get all messages matching a filter. Unlike 'shh_getFilterChanges' this returns all messages.

**Parameters**

-   `number_0` **BN** -- A number quantity.


Result **["SHHFilterChange"]**.

```js
const Fourtwenty = require('fourtwozerojs');
const fourtwenty = new Fourtwenty(new Fourtwenty.HttpProvider('http://localhost:6174'));

fourtwenty.shh_getMessages(<BN ...>)
.then((result) => {
  /*
  // result

  [{
    "hash": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "from": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "to": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "expiry": <BN ...>,
    "ttl": <BN ...>,
    "sent": <BN ...>,
    "topics": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "payload": "0xbf2b4596cbd1511f4a6ef8af06d03354f53cb8aa9508a6810b6f93d8bccbabd40cb8da3",
    "workProved": <BN ...>
  }]
  */
})
.catch((error) => {
  // null
});
```


## Browser Builds

`fourtwozerojs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/fourtwozerojs.js` or `dist/fourtwozerojs.min.js` directly into an HTML file to start using this module. Note, an `Fourtwenty` object is made available globally.

```html
<script type="text/javascript" src="fourtwozerojs.min.js"></script>
<script type="text/javascript">
Fourtwenty(...);
</script>
```

## Webpack Figures

Minified: **103 kB**.

```
Hash: b267c64f72c936248871
Version: webpack 2.1.0-beta.15
Time: 928ms
       Asset    Size  Chunks             Chunk Names
    fourtwozerojs.js  235 kB       0  [emitted]  main
fourtwozerojs.js.map  291 kB       0  [emitted]  main
  [24] multi main 28 bytes {0} [built]
    + 24 hidden modules

Hash: b7b0fe38a80ebbca42e2
Version: webpack 2.1.0-beta.15
Time: 3373ms
       Asset    Size  Chunks             Chunk Names
fourtwozerojs.min.js  103 kB       0  [emitted]  main
  [24] multi main 28 bytes {0} [built]
    + 24 hidden modules
```

Note, even though `fourtwozerojs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

