import React from 'react'

function TaskListItem(props) {
    const {title , requirements, priority, status, points } = props.task
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default TaskListItem
