'use strict'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './app'
/*import Filter from './components/filter'
import FilterResult from './components/filterResult'
import MapAndLocations from './components/mapAndLocations'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

render (
    <Router>
      <div>
      <Route exact path="/" component={App}/>
      <Route path="/locations" component={App}/>
      <Route path="/autocomplete" component={App}/>
      </div>
  </Router>,
    document.getElementById('root')
)*/

render (
  <App />,
    document.getElementById('root')
)

module.hot.accept();