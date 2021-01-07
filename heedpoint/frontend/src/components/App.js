import React from 'react'
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProjectCreateForm from './forms/ProjectCreateForm'
import ProjectsList from './Lists/ProjectsList';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <p>This is the home page wooo</p>
                </Route>
                <Route path='/newproject/' component={ProjectCreateForm} />
                <Route path='/myprojects/' component={ProjectsList} />
            </Switch>
        </Router>
    )
}

export default App

const container = document.getElementById('app');
render(<App /> , container)
