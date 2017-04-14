import React, { Component } from 'react'
import LocationAutocomplete from './locationAutocomplete'
import LocationList from './locationList'
import GoogleMap from './map'
import { GOOGLE_KEY, headers, SEARCH_FIELD } from '../constants/index.js'

export default class MapAndLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 53.6690364,
            lng: 23.8180562,
            info: ''
        }
    }

    toMap(e) {
        this.setState({
            lat: Number(e.target.rel.split('|')[0]),
            lng: Number(e.target.rel.split('|')[1]),
            info: e.target.rel.split('|')[2]
        })
    }

    toMapAutocomplete(e) {

        let body = 'mainUrl=https://maps.googleapis.com/maps/api/place/details/json?&placeid=' +
            e.target.rel + '&key=' + GOOGLE_KEY;

        document.getElementById('predictionsArea').style.display = 'none';
        SEARCH_FIELD.value=e.target.text;
        fetch('/locationData',
            {
                method: 'post',
                headers: headers,
                body: body
            }
        ).then((response) => {
            console.log('Requesting: ' + response.url);
            console.log('Responding from: ' + response.url);
            if (response.status !== 200) {
                console.log('Error. \nStatus Code: ' +
                    response.status + '\nStatus text: ' + response.statusText);
                return;
            }
            console.log('Status: ' + response.status + ' ' + response.statusText);
            console.log('Date: ' + response.headers.get('Date'));
            return response.json()
        }
            ).then((json) => {
                console.log(json.result.name + ' latLng: ' + json.result.geometry.location.lat + ','
                    + json.result.geometry.location.lng);
                console.log(json.result.formatted_address);
                this.setState({
                    lat: json.result.geometry.location.lat,
                    lng: json.result.geometry.location.lng,
                    info: json.result.name + ', ' + json.result.formatted_address
                })
            }
            ).catch((err) => {
                console.log('Fetch Error -', err);
            }
            )
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    info: ''+position.coords.latitude +', '+ position.coords.longitude
                })
            });
        }
    }


    render() {
        return (
            <div>
                <GoogleMap lat={this.state.lat} lng={this.state.lng} content={this.state.info} />
                <LocationAutocomplete handleClick={this.toMapAutocomplete.bind(this)} />
                <LocationList handleClick={this.toMap.bind(this)} />
            </div>
        );
    }


}
