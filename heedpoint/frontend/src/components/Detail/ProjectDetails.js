import React, { useState, useEffect } from 'react'
import CreateTaskForm from '../forms/CreateTaskForm'
import ProjectCreateForm from '../forms/ProjectCreateForm'
import TaskList from '../Lists/TaskList'
import {getCookie} from '../HelperFunctions/helpers.js'

function ProjectDetails(props) {
    const project_id = props.match.params.project_id
    const [isOwner, setIsOwner] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [ownerId, setOwnerId] = useState()
    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [deadLine, setDeadLine] = useState()
    const [showEdit, setShowEdit] = useState(false)
    
    const getProjectDetail = () => {
        fetch('/api/get-project' + '?id=' + project_id)
            .then(response => response.json())
            .then(data => {
                setLoaded(true)
                setIsOwner(data.isOwner)
                setOwnerId(data.ownerId)
                setIsMember(data.isMember)
                setTitle(data.title)
                setDescription(data.description)
                setDeadLine(data.deadline)
                console.log(isMember)
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
    const handleJoinRequest = (e) => {
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body:JSON.stringify({
                recipient: ownerId,
                message: `would like to join you project: ${title}`,
                request: project_id,
            })
        }
        fetch('/api/message/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
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

            {isMember ? null : <button onClick={handleJoinRequest}>Send a Join Request</button>}
            
            {loaded ? <TaskList project_id={project_id} isOwner={isOwner} /> : 'Still Loading'}
        </div>
    )
    
}

export default ProjectDetails
