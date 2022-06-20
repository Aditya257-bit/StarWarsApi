import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './List';
import Character from './Character';

export default function Routing () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={List}/>
        <Route exact path='/:id' component={Character}/>
      </Switch>
    </BrowserRouter>
  )
}
