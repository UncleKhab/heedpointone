import React from 'react'
import { Link } from 'react-router-dom'
function ProjectsListItem(props) {
    const {id , title, description, deadline} = props.item

    return (
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{deadline}</p>
                <a href={`/project/${id}`}>Click Here</a>
            </div>
            
    )
}

export default ProjectsListItem
