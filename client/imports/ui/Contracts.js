import React, { Component } from 'react'

class Contracts extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (index) {
    return () => this.props.onClick(index)
  }

  render () {

    const { list } = this.props

    return (
      <div className='Contracts'>
        {list.map((contract, index) => (
          <div key={index} className='Contract'>
            <span>
              {contract.publicKey}
            </span>
            <span
              href='#'
              onClick={this.handleClick(index)}>
                {' - GO - '}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

export default Contracts
