import React, {useState} from 'react'

function CreateTaskForm(props) {
    const [title, setTitle] =useState('')
    const [requirements, setRequirements] =useState('')
    const [points, setPoints] =useState('')
    const [taskStatus, setTaskStatus] =useState('p')
    const [priority, setPriority] =useState('l')

    const project = props.project
    
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
                project: project.id,
                title: title,
                requirements: requirements,
                points: points,
                status: taskStatus,
                priority: priority,
            })
        }
        fetch('/api/createtask/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name='title' 
                        id='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="requirements">Requirements</label>
                    <textarea 
                        type="text" 
                        name='requirements' 
                        id='requirements'
                        value={requirements}
                        onChange={e => setRequirements(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="points">Points</label>
                    <input 
                        type="number"
                        name="points" 
                        id="points"
                        value={points}
                        onChange={e => setPoints(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="taskStatus">Status</label>
                    <select name="taskStatus" value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
                        <option value="p">Pending</option>
                        <option value="r">Reviewing</option>
                        <option value="s">Started</option>
                        <option value="f">Finished</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priority">Status</label>
                    <select name="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="h">High Priority</option>
                        <option value="m">Medium Priority</option>
                        <option value="l">Low Priority</option>
                    </select>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default CreateTaskForm
