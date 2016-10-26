import React from 'react'
import { connect } from 'react-redux'

// === Global CSS ===
import 'flexboxgrid/dist/flexboxgrid.css'

// === Components ===
import Form from 'components/Form.jsx'

import { signup, login } from 'reducers/user.js'

const formFields = [{
  name: 'email',
  component: 'input',
  type: 'text'
}, {
  name: 'password',
  component: 'input',
  type: 'password'
}]

import { store } from './app.js'

const onSubmit = (values) => store.dispatch(signup(values))

const mapStateToProps = ({ user }) => ({ user })

const App = ({ user, dispatch }) => (
  <div>
    {user.isLoggedIn
      ? <h1>Welcome {user.username}</h1>
      : <h1>Not logged in</h1>
    }
    <h2>Signup</h2>
    <Form form="signup" onSubmit={onSubmit} fields={formFields}/>
    <h2>Login</h2>
    <Form form="login" fields={formFields} onSubmit={(values) => dispatch(login(values))}/>
  </div>
)

export default connect(mapStateToProps)(App)
