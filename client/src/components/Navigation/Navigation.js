import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigation extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Link to="/track-hub">Track Hub</Link>
            </div>
        )
    }
}

export default Navigation;