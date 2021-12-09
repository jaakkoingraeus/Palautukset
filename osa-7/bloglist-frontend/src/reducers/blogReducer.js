import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL',
      blogs: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
      case 'INITIAL':
        return (action.blogs)
      default:
        return ([])
    }
}

  
export default blogReducer