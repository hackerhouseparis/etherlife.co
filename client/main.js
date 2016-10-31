import { render } from 'react-dom'
import React from 'react'
import { Meteor } from 'meteor/meteor'

import App from './imports/ui/App'

Meteor.startup(() => render(<App />, document.getElementById('main')))

web3.eth.getBalance("0x73Aee431736394DB61aA172B95b954D60435b761",
function (err, res) {
  alert(res);
})
