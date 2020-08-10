import React from 'react';
import { Meme } from '../Memez/Meme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/memeGenerated';

// import styles from './styles.modules.css'

export const App = () => {
  return (
    <div>
      <h1>Robs Meme Creator</h1>
          <Switch>
      <Route exact path = '/'>
        <Meme />
      </Route>
      
      <Route path = '/generate'>
        <MemeGenerated />
      </Route>
    </Switch>

    </div>
  );
}


