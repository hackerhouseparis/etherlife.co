
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../store'

import { GrowlerComponent } from 'flash-notification-react-redux';

import Layout from './Layout'

export default () => (
  <Provider store={store}>
    <GrowlerComponent />
    <Layout />
  </Provider>
)
