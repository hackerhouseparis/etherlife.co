import { render } from 'react-dom'
import React from 'react'
import { Meteor } from 'meteor/meteor'

import App from './imports/ui/App'

Meteor.startup(
  () => {
    render(<App />, document.getElementById('main'))
  }
)

// var inactivityTime = 1000;
// var continuityContract = web3.eth.contract(Continuity.abi);
// var continuity = continuityContract.new(
//    inactivityTime,
//    {
//      from: web3.eth.accounts[0],
//      data: Continuity.bytecode,
//      gas: 4700000
//    }, function (e, contract){
//     console.log(e, contract);
//     if (typeof contract.address !== 'undefined') {
//          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//     }
//  })
