
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'

import Layout from './Layout'

export default () => (
  <Provider store={store}>
    <Layout />
  </Provider>
)
