const assert = require('chai').assert;
const TestRPC = require('fourtwentyjs-testrpc');
const provider = TestRPC.provider();
const Fourtwenty = require('../index.js');

describe('getTransactionSuccess.js', () => {
  it('should get tx receipt properly', (done) => {
    const fourtwenty = new Fourtwenty(provider);

    fourtwenty.accounts((accErr, accounts) => {
      assert.isNotOk(accErr);

      const defaultTxObject = {
        from: accounts[0],
        to: accounts[1],
        value: (new Fourtwenty.BN('4500')),
        data: '0x',
        smoke: 300000,
      };

      fourtwenty.sendTransaction(defaultTxObject, (txErr, txHash) => {
        assert.isNotOk(txErr);

        fourtwenty.getTransactionSuccess(txHash, (succErr, successResult) => {
          assert.isNotOk(succErr);
          assert.isOk(successResult);

          done();
        });
      });
    });
  });

  it('should trigger errors', (done) => {
    const fourtwenty = new Fourtwenty(provider);

    fourtwenty.getTransactionSuccess(33, (succErr) => {
      assert.isOk(succErr);

      done();
    });
  });

  it('should timeout', (done) => {
    const fourtwenty = new Fourtwenty(provider, { timeout: 1000, interval: 100 });

    fourtwenty.getTransactionSuccess('0xec66b273967d58c9611ae8dace378d550ccbd453e9815c78f8d1ffe5bb2aff1c', (succErr) => {
      assert.isOk(succErr);

      done();
    });
  });
});
