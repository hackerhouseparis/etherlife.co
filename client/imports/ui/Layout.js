
import React from 'react'

import Footer from './Footer'
import Jumbotron from './Jumbotron'
import Home from './Home'
import Connect from './Connect'

const Header = () => (
  <div className="full">
    <div className="container" >
      <Home />
    </div>
    <Jumbotron />
  </div>
)

const Content = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <Connect />
      </div>
    </div>
  </div>
)

export default () => (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
)
