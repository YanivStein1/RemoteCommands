import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login           from "./Login.js";
import Commands        from "./Commands.js";
import SetParameters   from "./SetParameters.js";
import ExecResults     from "./ExecResults.js";

export default () => (
     <BrowserRouter>
         <div>
             <Route path="/"                    exact component={Login} />
             <Route path="/Commands"            exact component={Commands} />
             <Route path="/SetParameters"       exact component={SetParameters} />
             <Route path="/ExecResults"         exact component={ExecResults} />
         </div>
     </BrowserRouter>
);
