import React, {useState} from 'react'

function ProjectCreateForm(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dead_line, setDeadLine] = useState("2021-01-07")
    
    function getCookie(name) {
        if (!document.cookie) {
          return null;
        }
      
        const xsrfCookies = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
      
        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: 'POST',
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
        fetch('/api/projects/', requestOptions)
            .then(response => response.json())
            .then(data => {
                props.history.push('/project/' + data.id)
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