import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

import { TextField as TF } from 'redux-form-material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class TextField extends TF {
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }
}
TextField.childContextTypes = {
  muiTheme: PropTypes.object
}

const Form = ({ handleSubmit, fields }) => (
  <form onSubmit={handleSubmit}>
    {fields.map((field, i) =>
      <div key={i}>
        {false ? <label htmlFor={field.name}>{field.name}</label> : null}
        <Field name={field.name} component={TextField} type={field.type} hintText={field.name}/>
      </div>
    )}
    <button type="submit">Submit</button>
  </form>
)

export default reduxForm({ form: 'signup' })(Form)
