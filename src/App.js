import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

// isso é a mudança inicial

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Login />
          <Album />
          <Search />
          <Favorites />
          <Profile />
          <ProfileEdit />
          <NotFound />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
