import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import AddTask from '../AddEditDelete/AddTask';
import CategoriesView from '../ChoreCategories/CategoriesView';
import EditOrDelete from '../AddEditDelete/EditOrDelete';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import LunarPhaseView from '../LunarPhase/LunarPhaseView';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserPage from '../UserPage/UserPage';

import './App.css';
import LoggedIn from '../Layouts/LoggedIn';
import LoggedOut from '../Layouts/LoggedOut';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
        <Redirect exact from="/" to="/home" />

        {/* Visiting localhost:3000/about will show the about page. */}
        <Route
          // shows AboutPage at all times (logged in or not)
          exact
          path="/about"
        >
          {user.id ?
            <LoggedIn>
              <AboutPage />
            </LoggedIn>
            :
            <LoggedOut>
              <AboutPage />
            </LoggedOut>}
        </Route>

        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:3000/user */}
        <ProtectedRoute
          // logged in shows UserPage else shows LoginPage
          exact
          path="/user"
        >
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute exact path="/user/categories/:selectedCategory">
          <CategoriesView />
        </ProtectedRoute>

        <ProtectedRoute exact path="/user/phase/:selectedPhase">
          <LunarPhaseView />
        </ProtectedRoute>

        <ProtectedRoute exact path="/user/add-task">
          <AddTask />
        </ProtectedRoute>

        <ProtectedRoute exact path="/user/edit-delete">
          <EditOrDelete />
        </ProtectedRoute>

        <ProtectedRoute
          // logged in shows InfoPage else shows LoginPage
          exact
          path="/info"
        >
          <InfoPage />
        </ProtectedRoute>

        <Route
          exact
          path="/login"
        >
          {user.id ?
            // If the user is already logged in, 
            // redirect to the /user page
            <Redirect to="/user" />
            :
            // Otherwise, show the login page
            <LoggedOut>
              <LoginPage />
            </LoggedOut>
          }
        </Route>

        <Route
          exact
          path="/registration"
        >
          {user.id ?
            // If the user is already logged in, 
            // redirect them to the /user page
            <Redirect to="/user" />
            :
            // Otherwise, show the registration page
            <LoggedOut>
              <RegisterPage />
            </LoggedOut>
          }
        </Route>

        <Route
          exact
          path="/home"
        >
          {user.id ?
            // If the user is already logged in, 
            // redirect them to the /user page
            <Redirect to="/user" />
            :
            // Otherwise, show the Landing page
            <LoggedOut>
              <LandingPage />
            </LoggedOut>
          }
        </Route>

        {/* If none of the other routes matched, we will show a 404. */}
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
