
import React from 'react'

import '../styles/Button.css'

export default ({
  content = '',
  status = 'primary',
  icon = 'rocket',
  action = v => v,
}) => (
  <p className='Button' onClick={action}>
    <i className={`fa fa-${icon}`} />
    <span>{content}</span>
  </p>
)
