import React, { Suspense } from 'react';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('homepage/HomePage'));
const DetailsPage = React.lazy(() => import('detailspage/DetailsPage'));
const SeatSelectionPage = React.lazy(() => import('seatselection/SeatSelection'));

import './App.scss';

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const routing = { history, location };

  const movieClickedHandler = (movie) => {
    const { id } = movie;
    history.push('details/' + id);
  };

  return (
    <Switch>
      <Route path="/details/:id">
        <Suspense fallback={null}>
          <DetailsPage location={location}></DetailsPage>
        </Suspense>
      </Route>
      <Route path="/book">
        <Suspense fallback={null}>
          <SeatSelectionPage routing={routing} />
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={null}>
          <HomePage movieClicked={movieClickedHandler} routing={routing} />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default App;
