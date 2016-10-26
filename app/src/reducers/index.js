import { combineReducers } from 'redux'

// === Reducers ===
import { reducer as formReducer } from 'redux-form'
import user from './user.js'

// === Root reducer ===
// State shape is an entry key at each reducer
export default combineReducers({
  user,
  form: formReducer
})
