import React, { Component } from 'react'
import Filter from './components/filter'
import LocationList from './components/locationList'
import FilterResult from './components/filterResult'
import LocationAutocomplete from './components/locationAutocomplete'

export default class App extends Component {
    render () {
        return (
            <div>
            <Filter />
            <LocationList />
            <FilterResult />
            <LocationAutocomplete />
            </div>
        );
    }
}

module.hot.accept();