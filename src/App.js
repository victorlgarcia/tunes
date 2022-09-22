import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// import Header from './components/Header';
import Carregando from './pages/Carregando';
import './style.css';

// isso é a mudança inicial

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route
            path="/search"
            component={ Search }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/carregando" component={ Carregando } />
          <NotFound />

        </Switch>

      </BrowserRouter>

    );
  }
}

export default App;
