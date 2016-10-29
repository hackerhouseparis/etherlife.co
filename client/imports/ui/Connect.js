
import React, { Component } from 'react'

import '../styles/Connect.css'

import Button from './Button'
import { connect } from 'react-redux'

import { setPublicKey } from '../reducers/app'

class Connect extends Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      publicKey: '',
    }
  }

  handleChange ({ target: { value } }) {
    this.setState({ publicKey: value })
  }

  submit () {
    const { dispatch } = this.props
    dispatch(setPublicKey(this.state.publicKey))
    this.setState({ publicKey: '' })
  }

  render () {

    const { publicKey } = this.state

    return (
      <div className='Connect'>
        <h1>Sign In </h1>
        <div className='Connect-Form'>
          <Button content='Metamask' icon='sign-in' />
          <input
            onChange={this.handleChange}
            value={publicKey}
            placeholder='Enter your public key'
          />
          <br />
          <Button
            action={this.submit}
            content='Submit'
            icon='send' />
        </div>
      </div>
    )
  }
}

export default connect()(Connect)
