import React, { Component } from 'react'
import Filter from './components/filter'
import FilterResult from './components/filterResult'
import MapAndLocations from './components/mapAndLocations'
// import Map from './components/map'

export default class App extends Component {
    render () {
        return (
            <div>
            <Filter /> 
            <FilterResult />
            <MapAndLocations />
            </div>
        );
    }
}

module.hot.accept();