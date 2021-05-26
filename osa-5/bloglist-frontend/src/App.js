import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [blogToAdd, setBlogToAdd] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (!user) {
      return
    }
    const userJSON = JSON.parse(user)
    setUser(userJSON)
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ 
        username, 
        password 
      })
      setUser(user)
      setUsername('')
      setPassword('')
      //Add user to local storage
      const userString = JSON.stringify(user)
      window.localStorage.setItem('user', userString)
    }
    catch {
      console.log('invalid credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            Username
            <input
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({ target }) => setUsername(target.value)}
            />
            Password
            <input
            type = "text"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login now</button>
        </form>
      </div>
    )
  }

  const blogsSection = () => {
    return (
      <>
      <div>
        <h2>Logged in as {user.name}</h2>
        <button onClick={logOut}>Log out</button>
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
      </>
    )
  }

  return (
    <>
    { user ?
      blogsSection() :
      loginForm()
    }
    </>
  )
}

export default App