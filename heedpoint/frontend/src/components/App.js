import React from 'react'
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import ProjectCreateForm from './forms/ProjectCreateForm'
import ProjectsList from './Lists/ProjectsList';
import ProjectDetails from './Detail/ProjectDetails'
import HomePage from './HomePage';


function App() {
    return (
        <div>
        
        <HomePage />
        
        <Router>
            <Switch>
                <Route exact path='/'>
                </Route>
                <Route path='/newproject/' component={ProjectCreateForm} />
                <Route path='/myprojects/' component={ProjectsList} />
                <Route path='/login/' component={LoginForm} />
                <Route path='/project/:project_id/' component={ProjectDetails} />
            </Switch>
        </Router>
        </div>
    )
}

export default App

const container = document.getElementById('app');
render(<App /> , container)
