import React from 'react'
import { Link } from 'react-router-dom'
function HomePage() {
    const handleLogOut = (e) => {
        e.preventDefault()
        fetch('/api/logout/').then(response => response.json()).then(data => {
            console.log(location)
            window.location = '/'
        })
    }
    return (
        <div>
            <a href="/newproject/">Create A New Project</a>
            <a href="/myprojects/">See Your Projects</a>
            <a href="/allprojects/">See All Projects</a>
            <button onClick={handleLogOut}>LogOut</button>
        </div>
    )
}

export default HomePage
