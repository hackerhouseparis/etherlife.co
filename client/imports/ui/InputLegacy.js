import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMessageFlash } from '../reducers/app'

import Menu from './Menu'
class InputLegacy extends Component {

  constructor (props) {
    super(props)
    this.state = {focus: false, value: '', messageFlash: ''}
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deploySmartContract = this.deploySmartContract.bind(this)
    this.submitContract = this.submitContract.bind(this)
    this.flashMessage = this.flashMessage.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({focus: false, value: event.target.value});
  }

  onFocus () {
    this.setState({focus: true, value: this.state.value})
  }

  onBlur () {
    this.setState({focus: false, value: this.state.value})
  }

  submitContract (event) {
    event.preventDefault();
  }

  flashMessage () {
    const { dispatch } = this.props
    this.setState({ messageFlash: 'test' })
    dispatch(setMessageFlash(this.state.messageFlash))
    this.setState({ messageFlash: '' })
  }

  deploySmartContract (event) {
    event.preventDefault();
    if ('undefined' === typeof web3) {
      alert("install metamask");
    } else {
      let res = this.state.value.split(",");
      let inactivityTime = res[0];
      let timeToClaim = res[1];
      let continuityContract = web3.eth.contract(Continuity.abi);
      let continuity = continuityContract.new(
         inactivityTime,
         timeToClaim,
         {
           from: web3.eth.accounts[0],
           data: Continuity.bytecode,
           gas: 4700000
         }, (event, contract, state) => {
          if (typeof contract.address !== 'undefined') {
               console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
               contractAdress = contract.address;
               contractTransactionHash = contract.transactionHash;
               this.flashMessage
               console.log(this.state)
          }
       })
     }
  }

  render() {
    return (
      <div className="section hero">
        <div className="container">
          <h1>Build your legacy of your ethers</h1>
          <form className="form_legacy" onSubmit={this.submitContract}>
            <input
              className="legacy"
              maxLength="256"
              placeholder="Time before transfer (seconds), Time to claim (seconds)"
              required="required"
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.value}
              onChange={this.handleChange}
              style={this.state.focus ? {
                borderTop: "2px solid #a8863d",
                borderBottom: "2px solid #a8863d",
                borderLeft: "2px solid #a8863d",
              } : {}} />
            <input className="submit_legacy" type="submit"  onClick={this.deploySmartContract} value="Create your legacy contract" />
          </form>
          {'undefined' === typeof web3 ? <div>Web3 account not found</div> : <div>Log in with {web3.eth.accounts[0]}</div>}
        </div>
      </div>
  )
  }
}

export default InputLegacy
