import React, { Component } from 'react';
import { deleteApplication, updateApplication } from '../../state/actions/applicationActions';
import { connect } from "react-redux";

// styles
import './applicationList.css';
import editIcon from '../../assests/edit.svg'
import updateIcon from '../../assests/refresh.svg'
// import closeIcon from '../../assests/error.svg';

class ApplicationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentApplication: { },
            editable: false,
            removeInput: ''
        }
        this.handleApplicationClick.bind(this)
        this.handleApplicationEdit.bind(this)
        this.saveApplicationChanges.bind(this)
    }

    componentDidMount() {
        this.setState({ currentApplication: this.props.application })
    }

    handleApplicationClick(action) {
        switch (action) {
            case 'editable':
                this.setState({editable: true})
                break;
            case 'update':
                this.setState({editable: false})
                const applicationID = this.state.currentApplication._id;
                const userID = this.props.userID;
                
                const options = {
                    applicationID: applicationID,
                    userID: userID,
                    application: this.state.currentApplication
                }
                this.props.updateApplication(options)
                break;
        }
    }

    handleApplicationEdit(event, action) {
        const newValue = event.target.value;

        switch (action) {
            case 'companyName':
                this.setState({ currentApplication: { ...this.state.currentApplication, companyName: newValue} });
                break;
            case 'currentApplicationStatus':
                this.setState({ currentApplication: { ...this.state.currentApplication, currentApplicationStatus: newValue} });
                break;
            case 'dateApplied':
                this.setState({ currentApplication: { ...this.state.currentApplication, dateApplied: newValue} });
                break;
            case 'lastUpdate':
                this.setState({ currentApplication: { ...this.state.currentApplication, lastUpdate: newValue} });
                break;
            case 'remove':
                this.setState({ removeInput: newValue })
                if (newValue === this.state.currentApplication.companyName) {
                    const applicationID = this.state.currentApplication._id;
                    const userID = this.props.userID;
                    const idsToDelete = {
                        applicationID: applicationID,
                        userID: userID
                    }
                    this.props.deleteApplication(idsToDelete)
                    this.setState({ currentApplication: {}, editable: false, removeInput: '' })
                }
                break;
        }
    }

    saveApplicationChanges() {
        this.setState({editable: false})
    }

    render() {
        const selectStatusArea = (
            <select className="applicationStatus" name="applicationStatus" onChange={(event) => this.handleApplicationEdit(event, 'currentApplicationStatus')} value={this.state.currentApplication.currentApplicationStatus}>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview">Interview</option>
                <option value="Job Offer">Job Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer Accepted">Offer Accepted</option>
            </select>
        )

        const editableArea = (
            <div className="editableArea-container">
                <div className="editable-content">
                    <div className="icon-update" onClick={() => this.handleApplicationClick('update')}><img src={updateIcon} title="sync changes" alt="sync changes"/></div>
                    <div className="editable-form">
                        <p>Company Name: </p><input type="text" placeholder="Google" onChange={(event) => this.handleApplicationEdit(event, 'companyName')} value={this.state.currentApplication.companyName} />
                        <p>Date Appied: </p><input type="text" placeholder="Jan 11, 2019" onChange={(event) => this.handleApplicationEdit(event, 'dateApplied')} value={this.state.currentApplication.dateApplied} />
                        <p>Current Application Status: </p> {selectStatusArea}
                        <p>Last Update: </p><input type="text" placeholder="Jan 15, 2019" onChange={(event) => this.handleApplicationEdit(event, 'lastUpdate')} value={this.state.currentApplication.lastUpdate} />
                        <p>Remove: </p><input type="text" onChange={(event) => this.handleApplicationEdit(event, 'remove')} value={this.state.removeInput}/>
                    </div>
                    <span className="hint">* to remove the application please type the companie's name (case sensitive)</span>
                </div>
            </div>
        )

        const mainContent = (
                <div className="application-block">
                    <div onClick={() => this.handleApplicationClick('companyName')}>
                        <p>{this.state.currentApplication.companyName}</p>
                    </div>
                    <div onClick={() => this.handleApplicationClick('dateApplied')}>
                        <p>{this.state.currentApplication.dateApplied}</p>
                    </div>
                    <div onClick={() => this.handleApplicationClick('currentApplicationStatus')}>
                        <p>{this.state.currentApplication.currentApplicationStatus}</p>
                    </div>
                    <div onClick={() => this.handleApplicationClick('lastUpdate')}>
                        <p>{this.state.currentApplication.lastUpdate}</p>
                    </div>
                    <div onClick={() => this.handleApplicationClick('editable')}>
                        <img className="edit-icon" src={editIcon} />
                    </div>
                </div>
                )

        return (
            <div>
                {this.state.editable ? editableArea : this.state.currentApplication.companyName ? mainContent : null}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      deleteApplication: application => dispatch(deleteApplication(application)),
      updateApplication: options => dispatch(updateApplication(options))
    };
  }

export default connect(null, mapDispatchToProps)(ApplicationList);