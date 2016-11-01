import React from 'react'
import Center from 'react-center'

import Button from './Button'

const styleLogo = {
  padding: '5% 0 3% 0',
}

const styleSubTitle = {
  fontFamily: "'Poiret One', cursive",
  fontSize: "60px",
}

export default () => (
  <div>
    <Center><img src="/images/etherlife_co.png" style={styleLogo} /></Center>
    <p className="lead text-xs-center" style={styleSubTitle}><strong>Secure your legacy</strong></p>
    <Center><Button content='Create your legacy contract' /></Center>
  </div>
)
