
import { render } from 'react-dom'
import React from 'react'
import { Meteor } from 'meteor/meteor'

import App from './imports/ui/App'

Meteor.startup(() => render(<App />, document.getElementById('main')))
