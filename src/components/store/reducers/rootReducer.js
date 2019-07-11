import authReducer from'./authReducer'
import authReducer from'./postReducer'
import {combineReducers} from 'redux'
import postReducer from './postReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
})

export default rootReducer