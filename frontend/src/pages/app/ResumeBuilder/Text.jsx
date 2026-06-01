import React, { useEffect, useContext } from "react";
import user_context from "../../../UseContext";

const Text = () => {
  const { formdata } = useContext(user_context);

  // useEffect(() => {
  //   console.log('🟢 Text.jsx received from context:', formdata);
  // }, [formdata]);
  useEffect(()=>{
  const { personalInfo, education, experiences, projects, skills } = formdata;
  },[])


  return (
    <div style={{padding: '30px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif'}}>
      <h1>📋 Your Resume</h1>
      
      <hr />

      {/* Personal Info */}
      <section>
        <h2>{formdata?.personalInfo?.fullName || '❌ Name not filled yet'}</h2>
        {formdata?.personalInfo?.title && <h3>{personalInfo?.fullName}</h3>}
        {formdata?.personalInfo?.summary && <p><strong>About:</strong> {formdata.personalInfo.summary}</p>}
      </section>

    </div>
  );
};

export default Text;