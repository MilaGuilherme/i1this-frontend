import React from 'react';
import ReactDOM from 'react-dom';

const App = () =>{
    return(
        <div>
            <h1>Hello world</h1>
            <h3>Hello stranger</h3>
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById("root"))