'use strict'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

render (
    <App />,
    document.getElementById('root')
)

module.hot.accept();