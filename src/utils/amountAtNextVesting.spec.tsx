import test from 'tape'
import { amountAtNextVesting } from './amountAtNextVesting'
import * as FnBigNumber from './fnBignumber'

const DEFAULT_TOTAL_AMOUNT = FnBigNumber.create(100)
const DEFAULT_CLIFF = 2
const DEFAULT_END = 10
const DEFAULT_START = 0
const DEFAULT_PERIOD_LENGTH = 1

test('Calculation of next vestable tokens', t => {
  t.test('Current time is before cliff', assert => {
    const VESTED_AMOUNT = FnBigNumber.create(0)
    const NOW = 1
    const vestableTokens = amountAtNextVesting(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.equal(vestableTokens.toString(), FnBigNumber.create(20).toString())
    assert.end()
  })
  t.test('Current time is at cliff, no tokens redeemed', assert => {
    const VESTED_AMOUNT = FnBigNumber.create(0)
    const NOW = 2
    const vestableTokens = amountAtNextVesting(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.equal(vestableTokens.toString(), FnBigNumber.create(20).toString())
    assert.end()
  })
  t.test('Current time is after cliff, 10 tokens redeemed', assert => {
    const VESTED_AMOUNT = FnBigNumber.create(10)
    const NOW = 2.5
    const vestableTokens = amountAtNextVesting(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.equal(vestableTokens.toString(), FnBigNumber.create(20).toString())
    assert.end()
  })
  t.test('Current time is after end', assert => {
    const VESTED_AMOUNT = FnBigNumber.create(0)
    const NOW = 11
    const vestableTokens = amountAtNextVesting(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.equal(vestableTokens.toString(), FnBigNumber.create(100).toString())
    assert.end()
  })
  t.test(
    'Current time is after end, half of the tokens have been redeemed',
    assert => {
      const VESTED_AMOUNT = FnBigNumber.create(50)
      const NOW = 11
      const vestableTokens = amountAtNextVesting(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      )
      assert.equal(vestableTokens.toString(), FnBigNumber.create(50).toString())
      assert.end()
    }
  )
})
