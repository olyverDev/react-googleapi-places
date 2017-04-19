import React, { Component } from 'react'

export default class FilterResult extends Component {
    constructor(props) {
        super(props);
        var value = props.value;
        this.state = { tag: '' }
        this.request = this.request.bind(this);
    }

    request(e) {

        if (!e.target.checked)
            this.setState((prevState, props) => ({
                tag: prevState.tag.replace(' #'+e.target.name, '')
            }));
        else
            this.setState((prevState, props) => ({
                tag: prevState.tag + ' #' + e.target.name
            }));
    }
      componentDidMount () {
        document.getElementById('shops').addEventListener('click', this.request);
        document.getElementById('medicine').addEventListener('click', this.request);
        document.getElementById('entertainment').addEventListener('click', this.request);
        document.getElementById('food').addEventListener('click', this.request);

    }

    render() {
        return (
            <div id='resultTag'>
                <p id='resultText'> {this.state.tag} </p>
            </div>
        )
    }
}