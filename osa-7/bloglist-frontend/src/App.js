import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginVisible, setLoginVisible] = useState(false)

  //Redux
  const dispatch = useDispatch()

  //New Blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  //Alert
  const alertText = useSelector(state => state.notifications)

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (!user) {
      return
    }
    const userJSON = JSON.parse(user)
    setUser(userJSON)
    blogService.setToken(userJSON.token)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      blogService.setToken(user.token)
    }
    catch {
      console.log('invalid credentials')
      dispatch(setNotification('Wrong password or username', false, 2))
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        <Alert alertText={alertText} />
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            username={username}
            handleLogin={handleLogin}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />

          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )

  }


  //ADD BLOG
  const blogSubmit = (e) => {
    e.preventDefault()
    const elem = e.target
    const blog = {
      title: elem.blogTitle.value,
      author: elem.blogAuthor.value,
      url: elem.blogUrl.value
    }
    console.log('Adding blog: ', blog)

    blogService.addBlog(blog, user)
    setNewUrl('')
    setNewTitle('')
    setNewAuthor('')
    dispatch(setNotification(`Blog ${blog.title} has been added`, true, 2))
  }

  const blogsSection = () => {
    return (
      <>
      <div>
        <Alert alertText={alertText}/>
        <h2>Add new blog</h2>
        <form onSubmit={blogSubmit}>
          <div>
          Title:
          <input
          type = "text"
          v
          alue = {newTitle}
          name = "blogTitle"
          onChange = {({ target }) => setNewTitle(target.value)}/>
          </div>
          <div>
          Author:
          <input
          type = "text"
          value = {newAuthor}
          name = "blogAuthor"
          onChange = {({ target }) => setNewAuthor(target.value)}/>
          </div>
          <div>
          URL:
          <input
          type = "text"
          value = {newUrl}
          name = "blogUrl"
          onChange = {({ target }) => setNewUrl(target.value)}/>
          </div>
          <button type="submit">Add blog</button>
        </form>
      </div>

      <div>
        <h2>Logged in as {user.name}</h2>
        <button onClick={logOut}>Log out</button>
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
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