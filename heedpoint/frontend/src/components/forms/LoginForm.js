import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
// Send to /api/login/
function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
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
                username:username,
                password:password
            })
        }
        fetch('/api/login/', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                props.history.push('/')
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"></label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={username}
                        onChange={e => {setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
