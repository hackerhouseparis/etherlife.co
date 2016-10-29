
import React from 'react'

import Jumbotron from './Jumbotron'
import Home from './Home'
import AvailableRights from './AvailableRights'

export default () => (
  <div>
    <div className="full">
      <div className="container" >
        <Home />
      </div>
      <Jumbotron />
    </div>

    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <AvailableRights />
        </div>
      </div>
    </div>
  </div>
)
