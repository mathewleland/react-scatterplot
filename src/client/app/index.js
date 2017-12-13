import React from 'react';
import {render} from 'react-dom';
import Chart from './Chart.js';

class App extends React.Component {
  render () {
    return <Chart />;
  }
}

render(<App/>, document.getElementById('app'));