import React, { Component } from 'react'

export default class GoogleMap extends Component {

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });

        var infowindow = new google.maps.InfoWindow({
            content: nextProps.content
        });

        var pos = { lat: nextProps.lat, lng: nextProps.lng }
        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
        });
        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    }


    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map,
            {
                center: {
                    lat: this.props.lat,
                    lng: this.props.lng
                },
                zoom: 12
            });
    }

    render() {
        return (
            <div id='map' ref='map' />
        );
    }
}
