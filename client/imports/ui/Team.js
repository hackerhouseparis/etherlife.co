import React, { Component } from "react"

class Team extends Component {

  render() {
    return (
      <div className="section blue">
        <div className="container">
          <h2>Team</h2>
          <div className="row">
            <div className="col-md-3">
              <figure>
                <img src="/images/wagner_nicolas.jpg" width="250px" alt="Wagner Nicolas" />
                <figcaption>Nicolas - <em>Developer</em></figcaption>
              </figure>
            </div>
            <div className="col-md-3">
              <figure>
                <img src="/images/lesaege_clement.jpg" width="250px" alt="Lesaege Clément" />
                <figcaption>Clément - <em>Computer scientist</em></figcaption>
              </figure>
            </div>
            <div className="col-md-3">
              <figure>
                <img src="/images/badi_guillaume.jpg" width="250px" alt="Badi Guillaume" />
                <figcaption>Guillaume - <em>Developer</em></figcaption>
              </figure>
            </div>
            <div className="col-md-3">
              <figure>
                <img src="/images/adoucoure_abdoulaye.jpg" width="250px" alt="Adoucourre Abdoulaye" />
                <figcaption>Abdoulaye - <em>Sustainable financing</em></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Team
