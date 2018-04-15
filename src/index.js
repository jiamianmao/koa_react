import React from 'react'
import ReactDOM from 'react-dom'

// applyMiddleware, compose, thunk 是对reduxDevtool的引用包
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// counter是利用 createStore 来创建store实例  Porvider 是给App提供store的
import { Provider } from 'react-redux'
// import { counter } from './index.redux'

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Login from '@/pages/login'
import Register from '@/pages/register'
import App from '@/pages/App'

import AuthRoute from '@/component/authroute'

import reducers from './reducer'
import './config'

const reduxDevtools = window.devToolsExtension() || (() => {})
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <div>
        <AuthRoute />
        <Route path='/app' component={App}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>        
      </div>
    </Router>
  </Provider>),
  document.getElementById('root')
)
