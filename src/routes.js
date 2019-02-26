import React from 'react'
import { Route, Switch } from 'react-router'
import ListPage from './pages/ListPage'
import ItemPage from './pages/ItemPage'

/*
 @see https://github.com/supasate/connected-react-router/blob/master/FAQ.md
 */
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={ListPage} />
      <Route exact path="/pokemon/:name" component={ItemPage} />
    </Switch>
  </div>
)

export default routes
