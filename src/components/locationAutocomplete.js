import React, { Component } from 'react'
import { GOOGLE_KEY, headers, SEARCH_FIELD } from '../constants/index.js'

const responseLanguage = 'en';

export default class LocationAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { predictions: [] };
    this.request = this.request.bind(this);
  }

  request(e) {

    if (e.target.value != '')
      document.getElementById('predictionsArea').style.display = 'block';

    let body = 'mainUrl=https://maps.googleapis.com/maps/api/place/queryautocomplete/json?&input='
      + e.target.value.toLowerCase() + '&key=' + GOOGLE_KEY + '&language=' + responseLanguage;

    fetch('/locationAutocomplete',
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
      this.setState({ predictions: json.predictions });
    }).catch(function (err) {
      console.log('Fetch Error -', err);
    })
  }

  componentDidMount() {
    SEARCH_FIELD.addEventListener('input', this.request);
  }

  componentWillUnmount() {
    SEARCH_FIELD.removeEventListener('input', this.request);
  }

  render() {
    return (
      <div id='predictionsArea'>
        {
          this.state.predictions.map((item, index) => (
            <div key={index} className='predictionItem' >
              <a href='#' className='predictionDescription'> {item.description} </a>
            </div>
          ))
        }
      </div>
    );
  }
}
