import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import {
    Results,
    Game
} from './pages';

export default () => (
    <div className="memory-application">
        <Switch>
            <Route exact path={'/'} component={Game}/>
            <Route exact path={'/results'} component={Results}/>
        </Switch>
    </div>
);
