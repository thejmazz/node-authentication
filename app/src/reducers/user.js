import { postJSON } from 'utils/fetch.js'

const SIGNUP = 'pk/user/SIGNUP'
const LOGIN = 'pk/user/LOGIN'

const defaultState = {
  username: '',
  isLoggedIn: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case SIGNUP:
    case LOGIN:
      const { username } = action

      return Object.assign({}, state, {
        username,
        isLoggedIn: true
      })
    default:
      return state
  }
}

export const signup = ({ email, password }) => (dispatch) => {
  postJSON('/signup', { email, password })
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: SIGNUP,
          username: email
        })
      }
    })
    .catch(err => console.error(err))
}
