const assert = require('chai').assert;
const TestRPC = require('fourtwentyjs-testrpc');
const Web3 = require('web3');
const provider = TestRPC.provider();
const provider2 = TestRPC.provider();
const Fourtwenty = require('../index.js');

describe('fourtwenty.js', () => {
  describe('constructor', () => {
    it('should construct properly', () => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof Fourtwenty, 'function');
      assert.equal(typeof fourtwenty, 'object');
      assert.equal(typeof fourtwenty.currentProvider, 'object');
      assert.equal(typeof fourtwenty.setProvider, 'function');
    });

    it('should throw under invalid construction', () => {
      assert.throws(() => Fourtwenty(provider), Error); // eslint-disable-line
    });

    it('should throw under invalid provider construction', () => {
      assert.throws(() => new Fourtwenty(Fourtwenty.HttpProvider('')), Error); // eslint-disable-line
    });
  });

  describe('setProvider', () => {
    it('should function normally', (done) => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof fourtwenty.setProvider, 'function');

      fourtwenty.accounts((err, accounts1) => {
        assert.equal(err, null);
        assert.equal(Array.isArray(accounts1), true);

        fourtwenty.setProvider(provider2);

        fourtwenty.accounts((err2, accounts2) => {
          assert.equal(err2, null);
          assert.equal(Array.isArray(accounts2), true);
          assert.notEqual(accounts1[0], accounts2[0]);

          done();
        });
      });
    });
  });

  describe('BN', () => {
    it('should function normally', () => {
      const val = '435348973849579834789378934';

      assert.equal(typeof Fourtwenty.BN, 'function');
      assert.equal(new Fourtwenty.BN(val).toString(10), val);
    });
  });

  describe('isAddress', () => {
    it('should function normally', () => {
      const addr = '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78';
      const addr1 = '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78'.toLowerCase();
      const invalid1 = 'sjhsdf';
      const invalid2 = 24323;
      const invalid3 = null;
      const invalid4 = '6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f78';
      const invalid5 = '6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f7';
      const invalid6 = '0x6e0E0e02377Bc1d90E8a7c21f12BA385C2C35f7';

      assert.equal(typeof Fourtwenty.isAddress, 'function');
      assert.equal(Fourtwenty.isAddress(addr), true);
      assert.equal(Fourtwenty.isAddress(addr1), true);
      assert.equal(Fourtwenty.isAddress(invalid1), false);
      assert.equal(Fourtwenty.isAddress(invalid2), false);
      assert.equal(Fourtwenty.isAddress(invalid3), false);
      assert.equal(Fourtwenty.isAddress(invalid4), false);
      assert.equal(Fourtwenty.isAddress(invalid5), false);
      assert.equal(Fourtwenty.isAddress(invalid6), false);
    });
  });

  describe('keccak256', () => {
    it('should function normally', () => {
      const web3 = new Web3();

      const val = '45666';
      const hashVal = '512635863c9f802993f66ea46be7d8c3af7a567b940fbda0313433f33c5cc699';
      const hexHashVal = `0x${hashVal}`;

      assert.equal(typeof Fourtwenty.keccak256, 'function');
      assert.equal(Fourtwenty.keccak256(val), hexHashVal);
      assert.equal(Fourtwenty.keccak256(val), web3.sha3(val));
    });
  });

  describe('Buffer', () => {
    it('should function normally', () => {
      assert.equal(new Fourtwenty.Buffer('sjdfhj', 'utf8').toString('utf8'), 'sjdfhj');
    });
  });

  describe('isHexString', () => {
    it('should function normally', () => {
      const val1 = '0x';
      const val2 = '0xecbcd9838f7f2afa6e809df8d7cdae69aa5dfc14d563ee98e97effd3f6a652f2';
      const val3 = '0x0a';
      const invalid1 = 49824;
      const invalid2 = null;
      const invalid3 = 'jjjjj';

      assert.equal(typeof Fourtwenty.isHexString, 'function');
      assert.equal(Fourtwenty.isHexString(val1), true);
      assert.equal(Fourtwenty.isHexString(val2), true);
      assert.equal(Fourtwenty.isHexString(val3), true);
      assert.equal(Fourtwenty.isHexString(invalid1), false);
      assert.equal(Fourtwenty.isHexString(invalid2), false);
      assert.equal(Fourtwenty.isHexString(invalid3), false);
    });
  });

  describe('fromMarley', () => {
    it('should function normally', () => {
      const web3 = new Web3(provider);

      const val = '23489723849723897239842';

      assert.equal(typeof Fourtwenty.fromMarley, 'function');
      assert.equal(Fourtwenty.fromMarley(val, '420coin').toString(10), web3.fromMarley(val, '420coin').toString(10));
    });
  });

  describe('toMarley', () => {
    it('should function normally', () => {
      const web3 = new Web3(provider);

      const val = '687676';

      assert.equal(typeof Fourtwenty.toMarley, 'function');
      assert.equal(Fourtwenty.toMarley(val, '420coin').toString(10), web3.toMarley(val, '420coin').toString(10));
    });
  });

  describe('toBN', () => {
    it('should function normally', () => {
      const testCases = [
        { actual: 55, expected: new Fourtwenty.BN(55) },
        { actual: '55', expected: new Fourtwenty.BN('55') },
        { actual: '0x0a', expected: new Fourtwenty.BN('a', 16) },
        { actual: '0a', expected: new Fourtwenty.BN('a', 16) },
        { actual: 0, expected: new Fourtwenty.BN(0) },
        { actual: 1, expected: new Fourtwenty.BN(1) },
        { actual: -1, expected: new Fourtwenty.BN(-1) },
        { actual: 3490853908345, expected: new Fourtwenty.BN(3490853908345) },
        { actual: '238473873297432987489723234239728974', expected: new Fourtwenty.BN('238473873297432987489723234239728974') },
        { actual: new Fourtwenty.BN(234023984), expected: new Fourtwenty.BN(234023984) },
        { actual: new Fourtwenty.BN(0), expected: new Fourtwenty.BN(0) },
      ];

      assert.equal(typeof Fourtwenty.toBN, 'function');

      testCases.forEach((testCase) => {
        assert.deepEqual(Fourtwenty.toBN(testCase.actual).toString(10), testCase.expected.toString(10));
      });
    });
  });

  describe('fromAscii', () => {
    it('should function normally', () => {
      const testCases = [
        { actual: 'myString', expected: '0x6d79537472696e67' },
        { actual: 'myString\x00', expected: '0x6d79537472696e6700' },
        { actual: '\u0003\u0000\u0000\u00005èÆÕL]\u0012|Î¾\u001a7«\u00052\u0011(ÐY\n<\u0010\u0000\u0000\u0000\u0000\u0000\u0000e!ßd/ñõì\f:z¦Î¦±ç·÷Í¢Ëß\u00076*\bñùC1ÉUÀé2\u001aÓB',
          expected: '0x0300000035e8c6d54c5d127c9dcebe9e1a37ab9b05321128d097590a3c100000000000006521df642ff1f5ec0c3a7aa6cea6b1e7b7f7cda2cbdf07362a85088e97f19ef94331c955c0e9321ad386428c' },
      ];

      assert.equal(typeof Fourtwenty.fromAscii, 'function');
      testCases.forEach((testCase) => {
        assert.equal(Fourtwenty.fromAscii(testCase.actual), testCase.expected);
      });
    });
  });

  describe('toAscii', () => {
    it('should function normally', () => {
      const testCases = [
        { actual: '0x6d79537472696e67', expected: 'myString' },
        { actual: '0x6d79537472696e6700', expected: 'myString\u0000' },
        { actual: '0x0300000035e8c6d54c5d127c9dcebe9e1a37ab9b05321128d097590a3c100000000000006521df642ff1f5ec0c3a7aa6cea6b1e7b7f7cda2cbdf07362a85088e97f19ef94331c955c0e9321ad386428c',
          expected: '\u0003\u0000\u0000\u00005èÆÕL]\u0012|Î¾\u001a7«\u00052\u0011(ÐY\n<\u0010\u0000\u0000\u0000\u0000\u0000\u0000e!ßd/ñõì\f:z¦Î¦±ç·÷Í¢Ëß\u00076*\bñùC1ÉUÀé2\u001aÓB' },
      ];

      assert.equal(typeof Fourtwenty.toAscii, 'function');
      testCases.forEach((testCase) => {
        assert.equal(Fourtwenty.toAscii(testCase.actual), testCase.expected);
      });
    });
  });

  describe('fromUtf8', () => {
    it('should function normally', () => {
      const testCases = [
        { actual: 'myString', expected: '0x6d79537472696e67' },
        { actual: 'myString\x00', expected: '0x6d79537472696e67' },
        { actual: 'expected value\u0000\u0000\u0000', expected: '0x65787065637465642076616c7565' },
      ];

      assert.equal(typeof Fourtwenty.fromUtf8, 'function');
      testCases.forEach((testCase) => {
        assert.equal(Fourtwenty.fromUtf8(testCase.actual), testCase.expected);
      });
    });
  });

  describe('toUtf8', () => {
    it('should function normally', () => {
      const testCases = [
        { actual: '0x6d79537472696e67', expected: 'myString' },
        { actual: '0x6d79537472696e6700', expected: 'myString' },
        { actual: '0x65787065637465642076616c7565000000000000000000000000000000000000', expected: 'expected value' },
      ];

      assert.equal(typeof Fourtwenty.toUtf8, 'function');
      testCases.forEach((testCase) => {
        assert.equal(Fourtwenty.toUtf8(testCase.actual), testCase.expected);
      });
    });
  });

  describe('HttpProvider', () => {
    it('should function normally', () => {
      assert.equal(typeof Fourtwenty.HttpProvider, 'function');
    });
  });

  describe('filter', () => {
    it('should function normally', (done) => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof fourtwenty.filter, 'object');

      done();
    });
  });

  describe('contract', () => {
    it('should function normally', (done) => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof fourtwenty.contract, 'function');

      done();
    });
  });

  describe('accounts', () => {
    it('should function normally', (done) => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof fourtwenty.accounts, 'function');

      fourtwenty.accounts().then((accounts) => {
        assert.equal(Array.isArray(accounts), true);

        done();
      });
    });
  });

  describe('getBalance', () => {
    it('should function normally', (done) => {
      const fourtwenty = new Fourtwenty(provider);

      assert.equal(typeof fourtwenty.getBalance, 'function');

      fourtwenty.accounts((err, accounts) => {
        fourtwenty.getBalance(accounts[0]).then((balance) => {
          assert.equal(balance.gt(100), true);

          done();
        });
      });
    });
  });
});
