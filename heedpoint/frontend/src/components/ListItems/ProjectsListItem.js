import React from 'react'

function ProjectsListItem(props) {
    const {id , title, description, deadline} = props.item

    const handleDetail = (e) => {
        console.log(e.target.id)
    }
    return (
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{deadline}</p>
                <button id={id} onClick={handleDetail}>See Project</button>
            </div>
            
    )
}

export default ProjectsListItem
