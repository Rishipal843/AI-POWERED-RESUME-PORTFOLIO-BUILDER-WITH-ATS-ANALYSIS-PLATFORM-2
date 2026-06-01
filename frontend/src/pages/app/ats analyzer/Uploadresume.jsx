import React, { useState, useRef } from 'react';
import axios from 'axios';
import './uploadresume.css';
import Cookies  from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Uploadresume = () => {
  const [charCount, setCharCount] = useState(0);
  const [jd,setjd]= useState("")
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const useremail = Cookies.get("username")
  const [count, setcount] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  

const getcount=async()=>{
  // const response= await axios.get(`https://ai-powered-resume-portfolio-builder-with.onrender.com/api/userresume/${useremail}`)
  // const result = await response.data.data
  // const length = result.length
  // if(length > 2){
  //   return alert("buy subscription")
  // }
 
  submitform()
  setLoading(true)
}




  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }}
  

    const submitform =async()=>{
      const formdata = new FormData()
    formdata.append("resume",file)
    formdata.append("jd", jd)  
    formdata.append("useremail",useremail)
    // formdata.append("counter",count)


    const response = await axios.post("https://ai-powered-resume-portfolio-builder-with.onrender.com/api/upload",formdata)
     const result= await response.data
    if(result.statuscode==0){
      
      alert("something problem")
      setLoading(false)
    }else{

      setLoading(false)
      navigate("/analysis", { state: { data: result } });

    }
    }

    
    

    
    // console.log(formdata)


  return (
    <div className="ra-container">
      <div className="ra-header">
        <h1 className="ra-title">Analyze Your <span className='title-resume'>Resume</span></h1>
        <p className="ra-subtitle">
          Upload your resume and paste the job description to get an instant ATS compatibility analysis
        </p>
      </div>

      <div className="ra-main-grid">
        {/* Resume Upload Card */}
       <div 
          className={`ra-upload-box ${file ? 'active' : ''}`} 
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf,.docx" 
            hidden 
          />
          
          <div className="ra-content">
            <div className="ra-circle">↑</div>
            <p className="ra-text-main">
              {file ? file.name : "Click to upload resume"}
            </p>
            <p className="ra-text-sub">PDF or DOCX (Max 5MB)</p>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="ra-card">
           <div className="ra-card-label">
             <span className="ra-icon ra-glow">✨</span>
             <span>Job Description</span>
          </div>
          <div className="ra-input-wrapper">
            <textarea 
              className="ra-textarea" 
                required
              placeholder="Paste the job description here..."
              onChange={(e)=>{ setjd(e.target.value);setCharCount(e.target.value.length)}}
            ></textarea>
            <div className="ra-counter">{charCount} characters</div>
          </div>
        </div>
      </div>

      <div className="ra-footer">
        <button className="ra-btn-submit" onClick={getcount} >
         {loading? ("Processing..."):("Analyze Resume")} 
        </button>
      </div>
    </div>



  );
};

export default Uploadresume;