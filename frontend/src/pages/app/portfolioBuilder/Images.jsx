import React from 'react'
import cookies from 'js-cookie';

const Image = () => {
       const username= cookies.get("username")

  
  return (
    <div>
      {username}
    </div>
  )
}

export default Image