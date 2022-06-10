import { Route, Switch } from 'react-router-dom';
// Switch: 매칭되는 경로를 찾으면 다른 Route를 더 찾지 않고 멈춤

import Layout from './components/layout/Layout';
import AllMeetupsPage from './pages/AllMeetups';
import FavoritesPage from './pages/Favorites';
import NewMeetupPage from './pages/NewMeetup';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact={true}>
          <AllMeetupsPage />
        </Route>
        <Route path='/new-meetup'>
          <NewMeetupPage />
        </Route>
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
      </Switch>
    </Layout>
  );
} 

export default App;
