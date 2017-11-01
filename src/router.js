import React from 'react'

import { Switch, Route } from 'react-router-dom'

// PUBLIC
import HomePage from 'routes/HomePage'
import LoginPage from 'routes/auth/LoginPage'
import OAuthHandler from 'routes/auth/OAuthHandler'
import AboutPage from 'routes/AboutPage'

// PRIVATE
import DashboardPage from 'routes/DashboardPage'
import UsersPage from 'routes/users/UsersPage'
import LogoutHandler from 'routes/auth/LogoutHandler'

import Page404 from 'routes/Page404'

export const PublicRoutes = () => (
  <div className="PublicRoutes">
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/oauth/callback' component={OAuthHandler} />
      <Route exact path='/about' component={AboutPage} />
      <Route component={Page404} />
    </Switch>
  </div>
)

export const PrivateRoutes = () => (
  <div className="PrivateRoutes">
    <Switch>
      <Route exact path='/' component={DashboardPage} />
      <Route exact path='/users' component={UsersPage} />
      <Route exact path='/logout' component={LogoutHandler} />
      <Route component={Page404} />
    </Switch>
  </div>
)
