import { ADD_APPLICATION, DATA_LOADED, DELETE_APPLICATION, UPDATE_APPLICATION } from './types'
import axios from 'axios'

export function addApplication(payload) {
  return function(dispatch) {
    axios.post(`http://localhost:5000/api/applications/new`, payload)
          .then(function (response) {
            if (response.data.message === "success") {
              return dispatch({ type: ADD_APPLICATION, payload: response.data.applications })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
  }
};

export function getAllApplications(userID) {
  return function(dispatch) {
    return axios.get(`http://localhost:5000/api/applications/all/${userID}`)
          .then(function (response) {
            return dispatch({ type: DATA_LOADED, payload: response.data.applications })
          })
          .catch(function (error) {
            console.log(error);
          });
  }
};

export function deleteApplication(idsToDelete) {
  const applicationID = idsToDelete.applicationID
  const userID = idsToDelete.userID
  return function(dispatch) {
    axios.delete(`http://localhost:5000/api/applications/delete/${userID}/${applicationID}`)
            .then(function (response) {
              if (response.data.message === "success") {
                return dispatch({ type: DELETE_APPLICATION, payload: response.data.removedID })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
  }
}

export function updateApplication(options) {
  const applicationID = options.applicationID;
  const userID = options.userID;
  const newApplication = options.application

  return function(dispatch) {
    axios.put(`http://localhost:5000/api/applications/update/${userID}/${applicationID}`, newApplication)
        .then((response) => {
          console.log(response)
          // if (response.data.message === "success") {
          //   return dispatch({ type: DELETE_APPLICATION, payload: response.data.removedID })
          // }
        })
        .catch(function (error) {
          console.log(error)
        })
  }
}