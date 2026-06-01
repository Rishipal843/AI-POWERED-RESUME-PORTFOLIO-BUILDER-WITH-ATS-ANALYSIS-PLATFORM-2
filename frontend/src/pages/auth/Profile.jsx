import React, { useContext } from 'react'
import user_context from '../../UseContext'
import axios from "axios"
import { useEffect, useState } from "react"

const Profile = () => {
const {email} = useContext(user_context)
const [data,setData] = useState([])

useEffect(()=>{

const fetchData = async ()=>{

const response = await axios.get("https://ai-powered-resume-portfolio-builder-with.onrender.com/api/userdata")
const result = response.data
setData(result.data)

}

fetchData()

},[])

console.log(data)


  return (
    <div>{email}</div>
  )
}

export default Profile