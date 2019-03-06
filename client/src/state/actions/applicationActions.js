import { ADD_APPLICATION, DATA_LOADED, DELETE_APPLICATION } from './types'
import axios from 'axios'

export function addApplication(payload) {
  return function(dispatch) {
    axios.post('http://localhost:8000/new-application', payload)
          .then(function (response) {
            return dispatch({ type: ADD_APPLICATION, payload: response.data })
          })
          .catch(function (error) {
            console.log(error);
          });
  }
};

export function getAllApplications() {
  return function(dispatch) {
    return axios.get('http://localhost:8000/applications')
          .then(function (response) {
            return dispatch({ type: DATA_LOADED, payload: response.data })
          })
          .catch(function (error) {
            console.log(error);
          });
  }
};

export function deleteApplication(id) {
  return function(dispatch) {
    return axios.delete(`http://localhost:8000/application/${id}`)
            .then(function (response) {
              return dispatch({ type: DELETE_APPLICATION, payload: response.data })
            })
            .catch(function (error) {
              console.log(error)
            })
  }
}


// export function getAllApplications() {
//   return function(dispatch) {
//     return fetch(`http://localhost:8000/applications`)
//             .then(response => response.json())
//             .then(json => {
//               dispatch({ type: DATA_LOADED, payload: json })
//     })
//   }
// }