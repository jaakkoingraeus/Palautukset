const app = require("../app")
const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.map( (n) => n.likes).reduce( (a, b) => a + b )
    }
}

const favouriteBlog = (blogs) => {
    const likes = blogs.map( (n) => n.likes)
    const max = Math.max(...likes)
    const index = likes.indexOf(max)
    const favBlog = blogs[index]
    return (
        {
            title: favBlog.title,
            author: favBlog.author,
            likes: favBlog.likes
        }
    )
}

const mostBlogs = (blogs) => {
    return 1
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}