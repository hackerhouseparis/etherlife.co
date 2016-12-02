import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMessageFlash } from '../reducers/app'

import Menu from './Menu'
class Ping extends Component {

  constructor (props) {
    super(props)
    this.state = {
      focus: false,
      value: '',
      ping: false,
      transactionHash: null
    }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.pingSmartContract = this.pingSmartContract.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  pingSmartContract (event) {
    event.preventDefault();
    if ('undefined' === typeof web3) {
      alert("install metamask");
    } else {
      let continuityContract = web3.eth.contract(Continuity.abi);
      let continuityContractInstance = continuityContract.at(this.state.value);
      continuityContractInstance.ping({from: web3.eth.accounts[0]}, (res,err) => {
        this.setState({ ping: true })
        this.setState({ transactionHash: err })
        console.log('ping ' + this.state.value)
		  });
    }
  }

  render() {
    return (
      <div className="section water">
        <div className="container">
          <form className="form_legacy" onSubmit={this.submitContract}>
            <input
              className="ping"
              maxLength="256"
              placeholder="Adress of your smart contract"
              required="required"
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.value}
              onChange={this.handleChange}
              style={this.state.focus ? {
                borderTop: "2px solid #fac960",
                borderBottom: "2px solid #fac960",
                borderLeft: "2px solid #fac960",
              } : {}} />
            <input className="submit_ping" type="submit"  onClick={this.pingSmartContract} value="Ping your smart contract" />
          </form>
          {this.state.ping ?
            <div className="alert alert-success" role="alert">
              <strong>Ping success!</strong><br/>Transaction hash: {this.state.transactionHash}
            </div> :
            <div></div>
          }
        </div>
      </div>
  )
  }
}

export default Ping
