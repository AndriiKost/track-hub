import { ADD_APPLICATION, DATA_LOADED, DELETE_APPLICATION } from '../actions/types';

const initialState = {
    applications: []
  };

  function applicationReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_APPLICATION:
            return Object.assign({}, state, {
                applications: state.applications.concat(action.payload)
            })
        case DATA_LOADED:
            return Object.assign({}, state, {
                applications: state.applications.concat(action.payload)
            })
        case DELETE_APPLICATION:
        return Object.assign({}, state, {
            applications: [...state.applications.filter(item => item._id !== action.payload.id )],
          });
    }
    return state;
  };

export default applicationReducer;