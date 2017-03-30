import React, { Component } from 'react'

export default class FilterItem extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'store' }
        this.handleClick = this.handleClick.bind(this);
        var text = this.props.text;
        var value = this.props.value;
    }

    handleClick(e) {
        if(!e.target.checked) {
            this.setState ({
                value: ''
            })
            this.value = this.state.value;
        }
        else {
            this.setState ({
                value: e.target.value
            })
            this.value = this.state.value;
        }
    }

    render() {
        return (
            <div>
                <li>
                    <input name={this.props.name} type={this.props.type}
                        onClick={this.handleClick} value={this.props.value} id={this.props.id} />
                    {this.props.text}
                </li>
            </div>
        )
    }
}