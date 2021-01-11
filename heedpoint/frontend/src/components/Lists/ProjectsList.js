import React, { useState, useEffect } from 'react'
import ProjectsListItem from '../ListItems/ProjectsListItem'


function ProjectsList(props) {
    const [projects, setProjects] = useState([])
    const [loaded, setLoaded] = useState(false)
    const box = props.box
    
    useEffect(() => {
        fetch(`/api/projects?box=${box}`)
        .then(response => response.json())
        .then(data => {
            setProjects(data)
            setLoaded(true)
        })
    }, [])
    const projectListCreator = () => {
        return (projects.map(project => {
            return <ProjectsListItem item={project} key={project.id}/>
            // return(<h1 key={project.id}>{project.title}</h1>)
        }))
    }
    
    return (
        <div>
            {loaded ? projectListCreator() : <h1>Still Loading</h1>}
        </div>
    )
}

export default ProjectsList
