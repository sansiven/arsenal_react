import React from 'react';
import Layout from './Hoc/Layout';

import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';


import { Switch } from 'react-router-dom';
import Home from "./components/home";
import SignIn from './components/signin';

import Dashboard from './components/admin/Dashboard';
import Team from './components/theTeam';
import TheMatches from './components/theMatches'; 
import NotFound from './components/ui/not_found';
import AdminMatches from './components/admin/matches';
import AddEditMatches from './components/admin/matches/addEditMatches.js';
import AdminPlayers from './components/admin/players';
import AddEditPlayers from './components/admin/players/addEditPlayers';

const Routes = (props) => {
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
        <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
        <PrivateRoute {...props} path="/admin_players/add_player/:id" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_players/add_player" exact component={AddEditPlayers} />
        <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatches} />
        <PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatches} />
        <PublicRoute {...props} restricted={ false} path="/" exact component={Home} />
        <PublicRoute {...props} restricted={ true} path="/sign_in" exact component={SignIn} />
        <PublicRoute {...props} restricted={false} path="/the_team" exact component={Team} />
        <PublicRoute {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
        <PublicRoute {...props} restricted={false} exact component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default Routes;
