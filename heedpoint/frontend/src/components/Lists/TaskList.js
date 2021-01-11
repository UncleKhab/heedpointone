import React ,{useEffect, useState} from 'react'
import CreateTaskForm from '../forms/CreateTaskForm'
import TaskListItem from '../ListItems/TaskListItem'

function TaskList(props) {
    
    const [taskList, setTaskList] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [reload, setReload] = useState(false)
    const isOwner = props.isOwner
    const project_id = props.project_id

    const taskListCreator = () => {
        return taskList.map(task => {
           return <TaskListItem key={task.id} task={task} />
        })
    }
    useEffect(() => {
        fetch(`/api/tasks?id=${project_id}`)
        .then(response => response.json())
        .then(data => {
            setTaskList(data)
            setLoaded(true)
        })
    }, [reload])
    return (
        <div>
            {isOwner ? <CreateTaskForm project_id={project_id} setReload={setReload}/> : null}
            <div id="taskList">
                {loaded ? taskListCreator() : <h1>Loading</h1>}
            </div>
        </div>
    )
}

export default TaskList
