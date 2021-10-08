import React from 'react'
import Status from 'features/status/status'
import ListBlog from 'features/listBlog/listBlog'

const Newsfeed = () => {
  return (
    <>
      <Status />
      <ListBlog type="all" />
    </>
  )
}

export default Newsfeed
