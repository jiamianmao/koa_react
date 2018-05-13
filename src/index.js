import React from 'react'
import ReactDOM from 'react-dom'

// applyMiddleware, compose, thunk 是对reduxDevtool的引用包
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// counter是利用 createStore 来创建store实例  Porvider 是给App提供store的
import { Provider } from 'react-redux'
// import { counter } from './index.redux'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '@/pages/login'
import Register from '@/pages/register'
import BossInfo from '@/pages/bossinfo'
import GeniusInfo from '@/pages/geniusinfo'
import Chat from '@/pages/chat'
import Dashboard from '@/component/dashboard'
import AuthRoute from '@/component/authroute'
import reducers from './reducer'
import './index.css'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </Router>
  </Provider>),
  document.getElementById('root')
)
