import React, {useState} from 'react'
import {getCookie} from '../HelperFunctions/helpers.js'



function ProjectCreateForm(props) {
    const [title, setTitle] = useState(props.title || "")
    const [description, setDescription] = useState(props.description || "")
    const [dead_line, setDeadLine] = useState(props.deadline || "")
    const { method, url } = props

    const handleSubmit = (e) =>{
        e.preventDefault()
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                title: title,
                description: description,
                deadline: dead_line,
            })
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(method === "POST"){
                    props.history.push('/project/' + data.id)
                }else{
                    window.location.reload()
                }
            })
    }

    const handleChange = (e) =>{
        let name = e.target.name
        switch(name){
            case 'title':
                setTitle(e.target.value)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
            case 'dead_line':
                setDeadLine(e.target.value)
                break;
            default:
                break;
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={title}
                    onChange={handleChange}
                    />
            </div>
            <div>
                <label htmlFor="description">Project Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    id="description" 
                    value={description}
                    onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="dead_line">Dead Line</label>
                <input 
                    type="date" 
                    name="dead_line" 
                    id="dead_line" 
                    value={dead_line}
                    onChange={handleChange}/>
            </div>
            <button type="submit">Create Project</button>
        </form>
    )
}

export default ProjectCreateForm