import React from 'react'

// === Global CSS ===
import 'flexboxgrid/dist/flexboxgrid.css'

// === Components ===
import Form from 'components/Form.jsx'

import { signup } from 'reducers/user.js'

const formFields = [{
  name: 'email',
  component: 'input',
  type: 'text'
}, {
  name: 'password',
  component: 'input',
  type: 'text'
}]

import { store } from './app.js'

const onSubmit = (values) => store.dispatch(signup(values))

const App = () => (
  <div>
    hello world
    <Form onSubmit={onSubmit} fields={formFields}/>
  </div>
)

export default App
