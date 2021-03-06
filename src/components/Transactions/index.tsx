import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../selectors'
import { Heading } from '../wallet/components'

export interface TransactionProps {
  type: 'incoming' | 'outgoing'
  fromTo: string
  value: string
  asset: 'MXC' | 'ETH'
  date: string
  link?: string
  hash: string
}

interface TransactionsProps {
  transactions: TransactionProps[]
  fetching: boolean
}
  
const heading: (type: 'incoming' | 'outgoing') => string = R.ifElse(
  R.equals('incoming'),
  R.always('Received'),
  R.always('Sent')
)

const arrowClass: (type: 'incoming' | 'outgoing') => string = R.ifElse(
  R.equals('incoming'),
  R.always('icon-arrow-left'),
  R.always('icon-arrow-right')
)

const Transaction = (
  { type, fromTo, value, asset, date, link }: TransactionProps,
  index: number
) => (
    

    <tr key={index}>
      <a href={link} target="_blank">

        <td className="cell-date">
          <span className="t-s t-bold">{date}</span>
        </td>
        <td className="cell-fromto">
          <span className="t-s t-bold">{heading(type)}&nbsp;{type === 'incoming' ? 'From:' : 'To:'}</span>
          <br/>
          <span>
            {fromTo}
          </span>
        </td>
        <td className="cell-asset">
          <span className="t-s t-bold">
            {value}&nbsp;{asset}
          </span>
        </td>
        <td className="cell-icon">
          <i className={`icon ${arrowClass(type)}`} />
        </td>

      </a>
    </tr>  
)

const TransactionsComponent = ({
  transactions,
  fetching,
}: TransactionsProps) => (
  <div className="content">
    <div className="box-inner">
      <div className="content-box content-transactions">

        <Heading routeHeading="Latest Transactions" />

        <table className="table-cards table-zebra table-transactions">
          <tbody>
            {fetching
              ? 'Fetching transactions'
              : R.addIndex<TransactionProps>(R.map)(Transaction)(transactions)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

const mapStateToProps: (
  state: selectors.State
) => TransactionsProps = R.applySpec({
  fetching: selectors.getFetchingTransactions,
  transactions: selectors.getTransactions,
})

export const Transactions = connect(mapStateToProps)(TransactionsComponent)
