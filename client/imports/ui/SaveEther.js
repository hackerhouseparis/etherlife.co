import React, { Component } from "react"

class SaveEther extends Component {

  render() {
    return (
      <div className="section white">
        <div className="container">
          <h2>Save your ethers if you have lost your private key</h2>
          <p>
            Define the first benefiacierie of your ethers as your second account.
            If you lost the private key on your first account,
            the ethers are automaticaly transferred of your second account.
          </p>
          <i className="fa fa-life-ring fa-5" style={{fontSize: '8em'}} aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default SaveEther
