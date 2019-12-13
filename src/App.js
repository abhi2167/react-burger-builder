import React from 'react';
import Layout from "./components/Layout/layout";
import BurgerBuilder from "./containers/BurgerBuilder/BugerBuilder";
import Checkout from './containers/Checkout/Checkout';
import {Switch, Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
        
      </div>
  );
}

export default App;
