import React, { Component } from 'react';

import './SingleApplication.css';

class SingleApplication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            application: { }
        }
    }

    componentDidMount() {
        const { appId } = '2';

        // const currentApplication = fakeApi.userID.applications
        // this.getSingleApplication(appId)
    }

    getSingleApplication = (appId) => {
        console.log(appId)
    }

    render() {
        return(
            <div>
                <h4>Company Name</h4>
            </div>
        )
    }
}

export default SingleApplication;