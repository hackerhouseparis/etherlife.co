
import React from 'react'

import '../styles/Button.css'

export default ({
  content = '',
  status = 'primary',
  icon = 'rocket',
  styleButton = {fontSize: '30px', padding: '10px 15px 10px 15px', margin: '100px 0 0 0'},
  action = v => v,
}) => (
  <p className='Button' onClick={action} style={styleButton}>
    <i className={`fa fa-${icon}`} />
    <span>{content}</span>
  </p>
)
