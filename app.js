import React, {useState} from 'react';

import {render} from 'react-dom';
import Map from "./src/components/Map.js";

const App = () => {
    return (
      <Map />
    );
  }

export default App;

export function renderToDOM(container) {
  render(<App />, container);
}
