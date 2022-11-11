const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((most, blog) => {
        return most.likes > blog.likes ? most : blog
    })
    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }
}

module.exports = {
    dummy, totalLikes, favouriteBlog
}