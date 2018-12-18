
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './react.png';

const App = () =>(
    <div>
        <img src={logo} />
        Hello wirld!!!!!!!!!!!!!!!!!!!!!!!!!!
    </div>
)


ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
