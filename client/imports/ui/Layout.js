
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Jumbotron from './Jumbotron'
import Home from './Home'
import Connect from './Connect'
import Contracts from './Contracts'
import Menu from './Menu'

const Header = () => (
  <div>
    <div className="container">
      <header>
        <Menu />
      </header>
    </div>
    <div className="section hero">
      <h1>Build your legacy of your ethers</h1>
      <div className="sign-up-form">
        <form className="w-clearfix" data-name="Signup Form" data-redirect="/success" name="wf-form-signup-form">
          <input className="field w-input" data-name="changeTimeBeforeInactivity" id="changeTimeBeforeInactivity" maxlength="256" name="changeTimeBeforeInactivity" placeholder="Time before transfer (seconds)" required="required" type="text" />
          <input className="button w-button" data-wait="Please wait..." type="submit" value="Create your legacy contract" />
        </form>
      </div>
      <Home />
      <Jumbotron />
    </div>
  </div>
)

const Content = connect(
  state => ({
    publicKey: state.app.publicKey,
    contracts: state.app.contractsList,
  })
)(class extends Component {

  render () {

    const { publicKey, contracts } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {!publicKey ? <Connect /> : <Contracts list={contracts} onClick={index => console.log(index)} />}
          </div>
        </div>
      </div>
    )
  }
})

export default () => (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
)
