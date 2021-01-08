import React, { useState, useEffect } from 'react'
import CreateTaskForm from '../forms/CreateTaskForm'
import TaskList from '../Lists/TaskList'

function ProjectDetails(props) {
    const project_id = props.match.params.project_id
    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [project, setProject] = useState({})
    const [taskList, setTaskList] = useState([])
    
    const getProjectDetail = () => {
        fetch('/api/get-project' + '?id=' + project_id)
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setProject(data)
                setTitle(data.title)
                setDescription(data.description)
                setTaskList(data.tasks)
            })
    }
    useEffect(() => {
        getProjectDetail()
    }, [])
    
    
    return (
        <div>
            <h1>{project_id} - {title}</h1>
            <p>{description}</p>
            <CreateTaskForm project={project}/>
            {loaded ? <TaskList taskList={taskList} /> : 'Still Loading'}
        </div>
    )
    
}

export default ProjectDetails
