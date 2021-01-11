import React ,{useEffect, useState} from 'react'
import TaskListItem from '../ListItems/TaskListItem'

function TaskList(props) {
    const taskList = props.taskList
    const [loaded, setLoaded] = useState(false)
    
    const taskListCreator = () => {
        return taskList.map(task => {
           return <TaskListItem key={task.id} task={task} />
        })
    }
    useEffect(() => {
        setLoaded(true)
    }, [taskList])
    return (
        <div id="taskList">
            {loaded ? taskListCreator() : <h1>Loading</h1>}
        </div>
    )
}

export default TaskList
