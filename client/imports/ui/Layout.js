
import React, { Component } from 'react'

import Footer from './Footer'
import Jumbotron from './Jumbotron'
import Home from './Home'
import Connect from './Connect'
import Contracts from './Contracts'

const Header = () => (
  <div className="full">
    <div className="container" >
      <Home />
    </div>
    <Jumbotron />
  </div>
)

class Content extends Component {

  constructor (props) {
    super(props)

    this.submit = this.submit.bind(this)

    this.state = {
      publicKey: null,
    }
  }

  submit (publicKey) {
    alert('Connect has submitted')
    this.setState({ publicKey })
  }

  render () {

    const { publicKey } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {!publicKey ? <Connect onSubmit={this.submit} /> : <Contracts onClick={index => alert(index)} />}
          </div>
        </div>
      </div>
    )
  }
}

export default () => (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
)
