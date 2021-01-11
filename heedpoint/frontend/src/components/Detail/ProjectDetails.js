import React, { useState, useEffect } from 'react'
import CreateTaskForm from '../forms/CreateTaskForm'
import ProjectCreateForm from '../forms/ProjectCreateForm'
import TaskList from '../Lists/TaskList'
import {getCookie} from '../HelperFunctions/helpers.js'

function ProjectDetails(props) {
    const project_id = props.match.params.project_id
    const [isOwner, setIsOwner] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [project, setProject] = useState({})
    const [taskList, setTaskList] = useState([])
    const [deadLine, setDeadLine] = useState()
    const [showEdit, setShowEdit] = useState(false)
    
    const getProjectDetail = () => {
        fetch('/api/get-project' + '?id=' + project_id)
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setProject(data)
                setTitle(data.title)
                setDescription(data.description)
                setTaskList(data.tasks)
                setIsOwner(data.isOwner)
                setDeadLine(data.deadline)
            })
    }
    useEffect(() => {
        getProjectDetail()
    }, [])

    const cancelEdit = (e) => {
        setShowEdit(false)
    }
    const handleEdit = (e) => {
        setShowEdit(true)
    }
    const handleDelete = (e) => {
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        }
        fetch(`/api/get-project?id=${project_id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                props.history.push('/myprojects/')
            })
    }
    
    return (
        <div>
            <h1>{project_id} - {title}</h1>
            <p>{description}</p>
            <div id="editForm"></div>
            <div id="cancelEdit"></div>
            {showEdit ? 
                (
                    <div>
                        <ProjectCreateForm method="PUT" url={`/api/get-project?id=${project_id}`} title={title} description={description} deadline={deadLine} /> 
                        <button onClick={cancelEdit}>Cancel Edit</button>
                    </div>
                )
                : null}
            {isOwner ? (
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                ) 
            : null}
            
            {loaded ? <TaskList project_id={project_id} isOwner={isOwner} /> : 'Still Loading'}
        </div>
    )
    
}

export default ProjectDetails
