import React from 'react'
import './App.css'

import { History } from 'history'
import { Provider } from 'react-redux'
import App from './App'
import { BlockchainProvider } from './blockchainContext'
import { Blockchain } from './utils/blockchain'

const Root = ({
  store,
  history,
  blockchain,
}: {
  store: any
  history: History
  blockchain?: Blockchain
}) => {
  return (
    <BlockchainProvider value={blockchain}>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </BlockchainProvider>
  )
}

export default Root
