import React, { Component } from 'react'
import { GOOGLE_KEY, headers, DEFAULT_LAT_LNG } from '../constants/index.js'

window.currentLatLng = '';
var body;

function getPosition(position) {
    currentLatLng = position.coords.latitude + ',' + position.coords.longitude;
    console.log('global latLng: ' + currentLatLng)
}

try {
    navigator.geolocation.getCurrentPosition(getPosition);
}
catch (err) {
    alert.Show('Can\'t get your current position :' + err);
}

export default class LocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            responseData: [],
            locationType: '',
            radius: '2000'
        }
        this.request = this.request.bind(this);
        this.extraRequest = this.extraRequest.bind(this);
        LocationList.propTypes = {
            handleClick: React.PropTypes.func,
        };
    }

    request(e) {
        document.getElementById('locationList').style.display = 'block';
        if (e.target.type == 'radio') {
            this.setState({
                radius: e.target.value
            });
        }
        else {
            if (!e.target.checked)
                this.setState((prevState, props) => ({
                    locationType: prevState.locationType.replace(e.target.value, '')
                }));
            else
                this.setState((prevState, props) => ({
                    locationType: prevState.locationType + '|' + e.target.value
                }));
        }

        if (currentLatLng != null)
            body =
                'mainUrl=https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location='
                + currentLatLng + '&types=' + this.state.locationType + '&radius=' + this.state.radius
                + '&key=' + GOOGLE_KEY;
        else
            body =
                'mainUrl=https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location='
                + DEFAULT_LAT_LNG + '&types=' + this.state.locationType + '&radius=' + this.state.radius
                + '&key=' + GOOGLE_KEY;

        fetch('/locations',
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
        }).then((json) => {
            this.setState({
                locations: json.results,
                responseData: json
            });
        }).catch(function (err) {
            console.log('Fetch Error -', err);
        })
    }

    extraRequest(e) {
        fetch('/extraLocations',
            {
                method: 'post',
                headers: headers,
                body: body + '&pagetoken=' + this.state.responseData.next_page_token
            }).then((response) => {
                console.log('Responding from ' + response.url);
                if (response.status !== 200) {
                    console.log('Error. Status Code: ' +
                        response.status + 'Status text: ' + response.statusText);
                    return;
                }
                console.log('Status: ' + response.status + ' ' + response.statusText);

                return response.json();
            }).then((json) => {
                this.setState({
                    locations: json.results,
                    responseData: json
                });
            }).catch(function (err) {
                console.log('Fetch Error -', err);
            });
    }

    componentDidMount() {
        document.getElementById('shops').addEventListener('click', this.request);
        document.getElementById('medicine').addEventListener('click', this.request);
        document.getElementById('entertainment').addEventListener('click', this.request);
        document.getElementById('food').addEventListener('click', this.request);
        document.getElementsByName('radio')[0].addEventListener('click', this.request);
        document.getElementsByName('radio')[1].addEventListener('click', this.request);
        document.getElementsByName('radio')[2].addEventListener('click', this.request);
        document.getElementsByName('radio')[3].addEventListener('click', this.request);
    }

    componentWillUnmount() {
        document.getElementById('shops').removeEventListener('click', this.request);
        document.getElementById('medicine').removeEventListener('click', this.request);
        document.getElementById('entertainment').removeEventListener('click', this.request);
        document.getElementById('food').removeEventListener('click', this.request);
        document.getElementsByName('radio')[0].removeEventListener('click', this.request);
        document.getElementsByName('radio')[1].removeEventListener('click', this.request);
        document.getElementsByName('radio')[2].removeEventListener('click', this.request);
        document.getElementsByName('radio')[3].removeEventListener('click', this.request);

    }

    render() {

        if (this.state.locations.length > 0) {
            return (
                <div>
                    <div id='locationList'>
                        <LocationResultSummary
                            number={this.state.locations.length}
                            onClick={this.extraRequest}
                            isNextPage={this.state.responseData.next_page_token} />
                        {
                            this.state.locations.map((item, index) => (
                                <div key={index} className='locationItem' >
                                    <a rel={item.geometry.location.lat + '|' + item.geometry.location.lng + '|' + item.name + ', ' + item.vicinity}
                                        href='#' onClick={this.props.handleClick} className='locationName'>{item.name}</a>
                                    <p className='locationAddress'> {item.vicinity} </p>
                                    <p className='locationLatLng'>Coordinates: {' '}
                                        {item.geometry.location.lat},{item.geometry.location.lng}</p>
                                    <p className='locationType'> {item.types[0]} </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id='locationList'>
                    <p> loading... </p>
                </div>
            )
        }
    }

}

var LocationResultSummary = React.createClass({
    render: function () {
        var number = this.props.number;
        var onClick = this.props.onClick;
        var showNumber;
        var showMore;
        var isNextPage = this.props.isNextPage;

        if (number > 0) {
            showNumber = <p id='numberOfPlaces'> Places: {this.props.number} </p>
            showMore = null;
        }

        if (isNextPage != null)
            showMore =
                <a href="#pageTopTag" onClick={this.props.onClick}
                    className='morePlacesTag'> Load more </a>

        return (
            <div>
                {showNumber}
                {showMore}
            </div>
        )
    }
})