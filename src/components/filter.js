import React, { Component } from 'react'
import FilterItem from './filterItem'

export default class Filter extends Component {
    render() {
        return (
            <div id='filter'>
                <ul className='filterElementsList'>
                    <h3 className='staticText'> Type </h3>
                    <FilterItem name='shops' type='checkbox' value='store' id='shops' text=' Shops' />
                    <FilterItem name='medicine' type='checkbox' value='hospital|health|doctor|pharmacy' id='medicine' text=' Medicine' />
                    <FilterItem name='entertainment' type='checkbox' value='night_club|bar|casino|zoo|museum|amusement_park' id='entertainment' text=' Entertainment' />
                    <FilterItem name='food' type='checkbox' value='food|cafe|restaurant' id='food' text=' Food' />
                    </ul>
                <ul className='filterElementsList'>
                    <h3 className='staticText'> Radius (metres) </h3>
                    <FilterItem name='radio' type='radio' value='500' text=' 500' />
                    <FilterItem name='radio' type='radio' value='1000' text=' 1000' />
                    <FilterItem name='radio' type='radio' value='2000' text=' 2000' />
                    <FilterItem name='radio' type='radio' value='5000' text=' 5000' />
                </ul>
            </div>
        );
    }

}