
import React from 'react'

import '../styles/Button.css'

export default ({
  content = '',
  status = 'primary',
  icon = 'rocket',
  action = v => v,
}) => (
  <p className='Button' onClick={action} style={{fontSize: '30px', padding: '10px 15px 10px 15px', margin: '100px 0 0 0'}}>
    <i className={`fa fa-${icon}`} />
    <span>{content}</span>
  </p>
)
