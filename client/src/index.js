import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';
// styles
import './index.css';


render(<App />, document.getElementById('root'));


serviceWorker.unregister();
