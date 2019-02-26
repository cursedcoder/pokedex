import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router'
import ListPage from './pages/ListPage'
import ItemPage from './pages/ItemPage'
import Sidebar from './components/sidebar'

/*
 @see https://github.com/supasate/connected-react-router/blob/master/FAQ.md
 */
const routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Fragment>
            <Sidebar {...props} />
            <ListPage {...props} />
          </Fragment>
        )}
      />
      <Route
        exact
        path="/pokemon/:name"
        render={props => (
          <Fragment>
            <Sidebar {...props} />
            <ItemPage {...props} />
          </Fragment>
        )}
      />
    </Switch>
  </div>
)

export default routes
