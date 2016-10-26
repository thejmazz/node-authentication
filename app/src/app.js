'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from 'reducers/index.js'

import App from './App.jsx'

// === Store ===
const logger = createLogger({
  predicate: (getState, action) => action.type.match(/^pk\//)
})
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

// Set up mount point
// TODO bake into HTML template
const domEntry = document.createElement('div')
domEntry.id = 'app'
document.body.appendChild(domEntry)

const render = () => {
  console.log('A render was called')
  const state = store.getState()

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    domEntry
  )
}

// Initial render since otherwise we would need to dispatch something like
// { type: INITIAL_DISPATCH }
render()

// Trigger entire application rerender on each update to store
// Dont need anymore due to Provider/connected components
// store.subscribe(render)

