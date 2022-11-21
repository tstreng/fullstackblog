const _ = require('lodash')

const dummy = (blogs) => {
  console.log('Number of blogs:',blogs.length)
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(blog => {sum += blog.likes})
  return sum
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev,current) => (prev.likes > current.likes) ? prev : current )
  // Ugly deletion
  delete favorite.url
  delete favorite.__v
  delete favorite._id
  return favorite
}

const mostBlogs = (blogs) => {
  const result = _(blogs)
    .map(({ author }) => ( author ))
    .countBy()
    .entries()
    .maxBy(_.last)
  return { author:result[0], blogs:result[1] }
}

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .map((author,id) => ({
      author: id,
      likes: _.sumBy(author,'likes')
    }))
    .maxBy('likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}