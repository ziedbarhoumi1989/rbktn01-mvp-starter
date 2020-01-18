const create = (params, credentials, post) => {
  return fetch('/api/posts/new/' + params.userId, {
    method: 'POST',

    body: post
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const listByUser = (params, credentials) => {
  return fetch('/api/posts/by/' + params.userId, {
    method: 'GET'
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const listNewsFeed = (params, credentials) => {
  return fetch('/api/posts/feed/' + params.userId, {
    method: 'GET'
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
  return fetch('/api/posts/' + params.postId, {
    method: 'DELETE'
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const like = (params, credentials, postId) => {
  return fetch('/api/posts/like/', {
    method: 'PUT',

    body: JSON.stringify({ userId: params.userId, postId: postId })
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const unlike = (params, credentials, postId) => {
  return fetch('/api/posts/unlike/', {
    method: 'PUT',

    body: JSON.stringify({ userId: params.userId, postId: postId })
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const comment = (params, credentials, postId, comment) => {
  return fetch('/api/posts/comment/', {
    method: 'PUT',

    body: JSON.stringify({ userId: params.userId, postId: postId, comment: comment })
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const uncomment = (params, credentials, postId, comment) => {
  return fetch('/api/posts/uncomment/', {
    method: 'PUT',

    body: JSON.stringify({ userId: params.userId, postId: postId, comment: comment })
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = {
  listNewsFeed,
  listByUser,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment
}
