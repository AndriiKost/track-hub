import React, { Component } from 'react'
import { connect } from "react-redux";
import { addApplication } from '../../state/actions/applicationActions'
import uuidv1 from 'uuid'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import saveIcon from '../../assests/paper-plane.svg';
import closeIcon from '../../assests/error.svg';
import './NewApplication.css';

class NewApplication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newApplication: {
                userID: '',
                companyName: '',
                dateApplied: '',
                lastUpdate: '',
                currentApplicationStatus: 'Applied',
            },
        }
    }

    handleNewApplication(event, action) {
        const newValue = event.target.value
        console.log(`REGISTERED CHANGE ON ${action} = ${newValue}`)

        switch (action) {
            case 'companyName':
                this.setState({ newApplication: { ...this.state.newApplication, companyName: newValue} });
                break;
            case 'currentApplicationStatus':
                this.setState({ newApplication: { ...this.state.newApplication, currentApplicationStatus: newValue} });
                break;
            case 'dateApplied':
                this.setState({ newApplication: { ...this.state.newApplication, dateApplied: newValue} });
                break;
            case 'lastUpdate':
                this.setState({ newApplication: { ...this.state.newApplication, lastUpdate: newValue} });
                break;
        }
    }

    save() {
        const newApplication = Object.assign({}, this.state.newApplication, {userID: this.props.auth.user.id});
        this.props.addApplication(newApplication);
        this.props.history.push('/track-hub');
    }

    close() {
        this.props.history.push('/track-hub')
    }

    render() {
        const selectStatusArea = (
            <select className="applicationStatus" name="applicationStatus" onChange={(event) => this.handleNewApplication(event, 'currentApplicationStatus')}>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview">Interview</option>
                <option value="Job Offer">Job Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer Accepted">Offer Accepted</option>
            </select>
        )

        const icons = (
            <div className="icons-container">
                <div className="icon-save" onClick={() => this.save()}>
                    <img src={saveIcon} />
                </div>
                <div className="icon-close" onClick={() => this.close()}>
                    <img src={closeIcon} />
                </div>
            </div>
        )

        const newApplicationArea = (
            <div className="editableArea-container">
            <div className="editable-content">
                {icons}
                <div className="editable-form">
                <p>Company Name: </p><input type="text" onChange={(event) => this.handleNewApplication(event, 'companyName')} value={this.state.newApplication.companyName} />
                <p>Date Appied: </p><input type="text" onChange={(event) => this.handleNewApplication(event, 'dateApplied')} value={this.state.newApplication.dateApplied} />
                <p>Current Application Status: </p> {selectStatusArea}
                <p>Last Update: </p><input type="text" onChange={(event) => this.handleNewApplication(event, 'lastUpdate')} value={this.state.newApplication.lastUpdate} />
                </div>
            </div>
        </div>
        )

        return (
            <div>
                {newApplicationArea}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      addApplication: application => dispatch(addApplication(application))
    };
  }

  const mapStateToProps = state => {
    return { 
        auth: state.auth
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewApplication);