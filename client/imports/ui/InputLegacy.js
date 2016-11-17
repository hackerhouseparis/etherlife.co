import React, { Component } from "react"

import Menu from './Menu'
class InputLegacy extends Component {

  constructor() {
    super()
    this.state = {focus: false}
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onFocus() {
    this.setState({focus: true})
  }

  onBlur() {
    this.setState({focus: false})
  }

  render() {
    return (
      <div className="section hero">
        <div className="container">
          <h1>Build your legacy of your ethers</h1>
          <form className="form_legacy">
            <input
              className="legacy"
              maxLength="256"
              placeholder="Time before transfer (seconds)"
              required="required"
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              style={this.state.focus ? {
                borderTop: "2px solid #a8863d",
                borderBottom: "2px solid #a8863d",
                borderLeft: "2px solid #a8863d",
              } : {}} />
            <input className="submit_legacy" type="submit" value="Create your legacy contract" />
          </form>
        </div>
      </div>
  )
  }
}

export default InputLegacy
