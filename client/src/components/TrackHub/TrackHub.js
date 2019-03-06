import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
// import { getAllApplications } from '../../state/actions/index'
import Loader from 'react-loader-spinner'
// 
import ApplicationList from '../applicationList/applicationList';
import ListHead from '../ListHead/ListHead';
import addIcon from '../../assests/add-button.svg';

// styles
import './TrackHub.css';

class TrackHub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            applications: [],
            loading: true
        }
    }

    componentDidMount() {
        this.props.getAllApplications().then(data => {
            this.setState({applications: data.payload, loading: false})
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.applications !== [] && nextProps.applications.length !== this.state.applications.length) {
            this.setState({applications: nextProps.applications, loading: false})
        }
    }

    render() {

        const addNewButton = (
            <div className="add-new">
                <div className="add-icon-container">
                    <img src={addIcon} className="add-icon" />
                </div>
                <p>Add New Application</p>
            </div>
        )

        const appList = (
            <ul className="application-list">
                <li><ListHead /></li>
                {this.state.applications.map(el => (
                    <li key={el._id} ><ApplicationList application={el} /></li>
                ))}
                    <li><Link to="/track-hub/new">{addNewButton}</Link></li>
            </ul>
        );

        const loader = (
            <Loader 
                type="Puff"
                color="rgb(36, 36, 36)"
                height="100"	
                width="100"
            />   
        )

        return (
            <div>
                <h1>TrackHub</h1>
                {this.state.loading ? loader : appList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { applications: state.applications };
};

export default connect(mapStateToProps, {getAllApplications})(TrackHub);