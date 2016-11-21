import React, { Component } from "react"

class Team extends Component {

  render() {
    return (
      <div className="section blue">
        <div className="container">
          <h2>Team</h2>
          <div className="row">
            <div className="col-md-4"><img src="/images/wagner_nicolas.jpg" width="250px" alt="Wagner Nicolas" /></div>
            <div className="col-md-4"><img src="/images/lesaege_clement.jpg" width="250px" alt="Lesaege Clément" /></div>
            <div className="col-md-4"><img src="/images/adoucoure_abdoulaye.jpg" width="250px" alt="Adoucourre Abdoulaye" /></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Team
