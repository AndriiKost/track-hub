import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllApplications } from '../../state/actions/applicationActions'
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
        const userID = this.props.auth.user.id
        this.props.getAllApplications(userID).then(data => {
            if (data.payload){
                data.payload.map(el => {
                    if (el._id && el.companyName && el.currentApplicationStatus && el.dateApplied && el.lastUpdate) {
                        const joined = this.state.applications.concat(el);
                        this.setState({ applications: joined })
                    }
                })
                this.setState({loading: false})
            } 
        })
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
                    <li key={el._id} ><ApplicationList userID={this.props.auth.user.id} application={el} /></li>
                ))}
                    <li><Link to="/track-hub/new">{addNewButton}</Link></li>
            </ul>
        );

        return (
            <div>
                {this.state.loading ? <h3>loading ...</h3> : appList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        applications: state.applications,
        auth: state.auth
     };
};

export default connect(mapStateToProps, {getAllApplications})(TrackHub);