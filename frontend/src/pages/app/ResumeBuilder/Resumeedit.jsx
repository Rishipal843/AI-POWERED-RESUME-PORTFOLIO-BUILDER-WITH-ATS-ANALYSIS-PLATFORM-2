import React, { useContext, useEffect, useState, useRef } from 'react'
import "./Resumeedit.css"
import { useSearchParams } from 'react-router-dom'
import { Template_components } from './Templateregistry'
import user_context from '../../../UseContext'
import jsPDF from "jspdf";

const CountedField = ({
  as = 'input',
  defaultValue = '',
  maxLength,
  className = '',
  onChange,
  ...props
}) => {
  const FieldTag = as;
  const initialValue = defaultValue || '';
  const [count, setCount] = useState(initialValue.length);

  const handleChange = (e) => {
    setCount(e.target.value.length);
    if (onChange) onChange(e);
  };

  return (
    <div className={`counted-field ${className}`.trim()}>
      <FieldTag
        defaultValue={initialValue}
        maxLength={maxLength}
        onChange={handleChange}
        {...props}
      />
      <span className='char-counter'>{count}/{maxLength}</span>
    </div>
  );
};

const Resumeedit = () => {
  const { formdata, setformdata } = useContext(user_context)
  const [param] = useSearchParams()
  const selectedTemplate = param.get('template')
  const template = selectedTemplate || formdata?.template
  const Selectedtemplate = Template_components[template]
  const hasHydratedFromContext = useRef(false);

  const defaultVisibleSections = {
    summary: true,
    education: true,
    experience: true,
    projects: true,
    certificates: true,
    skills: true
  };

  // --- NEW STATE: Font Size Control ---
  const [fontSize, setFontSize] = useState(16);

  // --- NEW STATE: Section Visibility Control ---
  const [visibleSections, setVisibleSections] = useState(defaultVisibleSections);

  const toggleSectionVisibility = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


// --- NEW STATE: Line Height Control ---
const [lineHeight, setLineHeight] = useState(1.5); // Default is 1.5

// Handlers
const increaseLineHeight = () => setLineHeight(prev => Math.min(2.5, prev + 0.1));
const decreaseLineHeight = () => setLineHeight(prev => Math.max(1.0, prev - 0.1));


 // --- EMPTY STATE FOR NEW RESUME ---
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    title: '',
    summary: ''
  });

  const [links, setLinks] = useState({
    email: { active: true, url: '' },
    mobile: { active: true, url: '' },
    address: { active: true, url: '' },
    github: { active: true, url: '' },
    linkedin: { active: true, url: '' },
    website: { active: true, url: '' },
    instagram: { active: false, url: '' },
  });

  const [education, setEducation] = useState([
    { 
      school: '', 
      degree: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }
  ]);

  const [experiences, setExperiences] = useState([
    { 
      company: '', 
      role: '', 
      startDate: '', 
      endDate: '', 
      desc: '' 
    }
  ]);

  const [projects, setProjects] = useState([
    { 
      title: '', 
      link: '', 
      desc: '' 
    }
  ]);

const [certificates, setCertificates] = useState('');

const [skills, setSkills] = useState([
  { category: '', list: '' }
]);

  useEffect(() => {
    if (selectedTemplate || hasHydratedFromContext.current || !formdata) return;

    setPersonalInfo(formdata.personalInfo || { fullName: '', title: '', summary: '' });
    setLinks(formdata.links || {
      email: { active: true, url: '' },
      mobile: { active: true, url: '' },
      address: { active: true, url: '' },
      github: { active: true, url: '' },
      linkedin: { active: true, url: '' },
      website: { active: true, url: '' },
      instagram: { active: false, url: '' },
    });
    setEducation(formdata.education?.length ? formdata.education : [
      { school: '', degree: '', startDate: '', endDate: '', description: '' }
    ]);
    setExperiences(formdata.experiences?.length ? formdata.experiences : [
      { company: '', role: '', startDate: '', endDate: '', desc: '' }
    ]);
    setProjects(formdata.projects?.length ? formdata.projects : [
      { title: '', link: '', desc: '' }
    ]);
    setCertificates(formdata.certificates || '');
    setSkills(formdata.skills?.length ? formdata.skills : [{ category: '', list: '' }]);
    setFontSize(formdata.fontSize || 16);
    setVisibleSections(formdata.visibleSections || defaultVisibleSections);
    setLineHeight(formdata.lineHeight || 1.5);

    hasHydratedFromContext.current = true;
  }, [formdata, selectedTemplate]);

  const renderCountedField = ({
    as = 'input',
    defaultValue = '',
    maxLength,
    className = '',
    ...props
  }) => (
    <CountedField
      as={as}
      defaultValue={defaultValue}
      maxLength={maxLength}
      className={className}
      {...props}
    />
  );

  // Font Handlers
  const increaseFontSize = () => setFontSize(prev => prev + 1);
  const decreaseFontSize = () => setFontSize(prev => Math.max(8, prev - 1));

  const addEducation = () => setEducation([...education, { school: '', degree: '', startDate: '', endDate: '', description: '' }]);
  const addExperience = () => setExperiences([...experiences, { company: '', role: '', startDate: '', endDate: '', desc: '' }]);
  const addProject = () => setProjects([...projects, { title: '', link: '', desc: '' }]);
  const addSkillGroup = () => setSkills([...skills, { category: '', list: '' }]);

  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));
  const removeSkillGroup = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const toggleLink = (platform) => {
    setLinks(prev => ({
      ...prev,
      [platform]: { ...prev[platform], active: !prev[platform].active }
    }));
  };

  const handleLinkChange = (platform, value) => {
    setLinks(prev => ({
      ...prev,
      [platform]: { ...prev[platform], url: value }
    }));
  };

  const handleSkillChange = (index, field, value) => {
  const newSkills = skills.map((item, i) => 
    i === index ? { ...item, [field]: value } : item
  );
  setSkills(newSkills);
};

  useEffect(() => {
    setformdata({
      personalInfo,
      links,
      education,
      experiences,
      projects,
      certificates,
      skills,
      template,
      fontSize,
      visibleSections,
      lineHeight
    });
  }, [personalInfo, links, education, experiences, projects, certificates, skills, template, fontSize, visibleSections,lineHeight]);

  const contentRef = useRef();

 const downloadPDF = async () => {
  const element = contentRef.current;
  if (!element) return;

  const visiblePageCount = Array.from(element.children).filter(
    (child) => child.dataset.measurePages !== "true"
  ).length;

  element.classList.add('pdf-export-mode');

  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  try {
    await pdf.html(element, {
      x: 0,
      y: 0,
      width: 210,
      windowWidth: 794,
      
      // Enable auto paging to capture all pages
      autoPaging: "text", 
      
      margin: [0, 0, 0, 0], // CSS padding handles the 10mm margin
      callback: function (doc) {
        while (doc.getNumberOfPages() > visiblePageCount) {
          doc.deletePage(doc.getNumberOfPages());
        }

        doc.save("Resume.pdf");
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
  } finally {
    element.classList.remove('pdf-export-mode');
  }
};

  return (
    <div className='edit-container'>
      <div className='edit-left'>
        <div className="scroll-wrapper">
          
          {/* FONT CONTROL SECTION */}
          <div className='form-section'>
            <h2>Adjust Font Size</h2>
            <div className='font-controls-wrapper'>
              <button className='font-adjust-btn' onClick={decreaseFontSize}>A-</button>
              <span className='font-size-label'>{fontSize}px</span>
              <button className='font-adjust-btn' onClick={increaseFontSize}>A+</button>
            </div>
          </div>
          <div className='form-section'>
  <h2>Adjust Line Spacing</h2>
  <div className='font-controls-wrapper'>
    <button className='font-adjust-btn' onClick={decreaseLineHeight}>↕-</button>
    <span className='font-size-label'>{lineHeight.toFixed(1)}</span>
    <button className='font-adjust-btn' onClick={increaseLineHeight}>↕+</button>
  </div>
</div>

          <div className='form-section'>
            <h2>Personal details</h2>
            <div className='info-inputs'>
              <label>Full name</label>
              {renderCountedField({
                type: 'text',
                name: 'fullName',
                defaultValue: '',
                maxLength: 30,
                placeholder: 'e.g. John Doe',
                onChange: handlePersonalChange
              })}
              <label>Title</label>
              {renderCountedField({
                type: 'text',
                name: 'title',
                defaultValue: '',
                maxLength: 100,
                placeholder: 'e.g. Full Stack Developer',
                onChange: handlePersonalChange
              })}
              <label style={{marginTop: '15px'}}>Contact & Social Links</label>
              <div className='link-buttons-container'>
                {Object.keys(links).map(platform => (
                  <button key={platform} type="button" className={`link-toggle-btn ${links[platform].active ? 'active' : ''}`} onClick={() => toggleLink(platform)}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
              <div className='active-link-inputs'>
                {Object.keys(links).map(platform => (
                  links[platform].active && (
                    <div key={platform} className="fade-in">
                      <label className='active-link-label'>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                      <input type="text" defaultValue='' placeholder={platform === 'email' ? 'e.g. hello@site.com' : platform === 'mobile' ? 'e.g. +91 98765 43210' : platform === 'address' ? 'e.g. Jalandhar, Punjab' : `Paste ${platform} link here...`}  onChange={(e) => handleLinkChange(platform, e.target.value)} />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Professional Summary</h2>
              <button 
                className={`visibility-toggle ${visibleSections.summary ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('summary')}
              >
                {visibleSections.summary ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.summary && (
              <div className='info-inputs'>
                {renderCountedField({
                  as: 'textarea',
                  name: 'summary',
                  defaultValue: '',
                  maxLength: 450,
                  placeholder: 'Write a short professional bio...',
                  rows: 4,
                  onChange: handlePersonalChange
                })}
              </div>
            )}
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Education</h2>
              <button 
                className={`visibility-toggle ${visibleSections.education ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('education')}
              >
                {visibleSections.education ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.education && (
              <>
                {education.map((edu, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Education #{index + 1}</label>
                      {education.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeEducation(index)}>Remove</button>
                      )}
                    </div>
                    {renderCountedField({
                      type: 'text',
                      defaultValue: '',
                      placeholder: 'School / University',
                      maxLength: 60,
                      onChange: (e) => setEducation(education.map((item, i) => i === index ? {...item, school: e.target.value} : item))
                    })}
                    {renderCountedField({
                      type: 'text',
                      defaultValue: '',
                      placeholder: 'Degree / Major',
                      maxLength: 60,
                      onChange: (e) => setEducation(education.map((item, i) => i === index ? {...item, degree: e.target.value} : item))
                    })}
                    <div className='row-inputs'>
                      <input type="text" defaultValue='' placeholder='Start Date'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, startDate: e.target.value} : item))} />
                      <input type="text" defaultValue='' placeholder='End Date'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, endDate: e.target.value} : item))} />
                    </div>
                    {renderCountedField({
                      as: 'textarea',
                      defaultValue: '',
                      placeholder: 'Description (GPA, honors, etc.)',
                      maxLength: 150,
                      rows: 2,
                      onChange: (e) => setEducation(education.map((item, i) => i === index ? {...item, description: e.target.value} : item))
                    })}
                    {index !== education.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addEducation}>+ Add Education</button>
              </>
            )}
          </div>



          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Work Experience</h2>
              <button 
                className={`visibility-toggle ${visibleSections.experience ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('experience')}
              >
                {visibleSections.experience ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.experience && (
              <>
                {experiences.map((exp, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Experience #{index + 1}</label>
                      {experiences.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeExperience(index)}>Remove</button>
                      )}
                    </div>
                    {renderCountedField({
                      type: 'text',
                      defaultValue: '',
                      placeholder: 'Company Name',
                      maxLength: 50,
                      onChange: (e) => setExperiences(experiences.map((item, i) => i === index ? {...item, company: e.target.value} : item))
                    })}
                    {renderCountedField({
                      type: 'text',
                      defaultValue: '',
                      placeholder: 'Role',
                      maxLength: 50,
                      onChange: (e) => setExperiences(experiences.map((item, i) => i === index ? {...item, role: e.target.value} : item))
                    })}
                    <div className='row-inputs'>
                      <input type="text" defaultValue='' placeholder='Start Date' onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, startDate: e.target.value} : item))} />
                      <input type="text" defaultValue='' placeholder='End Date' onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, endDate: e.target.value} : item))} />
                    </div>
                    {renderCountedField({
                      as: 'textarea',
                      defaultValue: '',
                      placeholder: 'Work description...',
                      maxLength: 500,
                      rows: 2,
                      onChange: (e) => setExperiences(experiences.map((item, i) => i === index ? {...item, desc: e.target.value} : item))
                    })}
                    {index !== experiences.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addExperience}>+ Add Experience</button>
              </>
            )}
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Projects</h2>
              <button 
                className={`visibility-toggle ${visibleSections.projects ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('projects')}
              >
                {visibleSections.projects ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.projects && (
              <>
                {projects.map((proj, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Project #{index + 1}</label>
                      {projects.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeProject(index)}>Remove</button>
                      )}
                    </div>
                    {renderCountedField({
                      type: 'text',
                      defaultValue: '',
                      placeholder: 'Project Title',
                      maxLength: 80,
                      onChange: (e) => setProjects(projects.map((item, i) => i === index ? {...item, title: e.target.value} : item))
                    })}
                    <input type="text" defaultValue='' placeholder='Link (Optional)'  onChange={(e) => setProjects(projects.map((item, i) => i === index ? {...item, link: e.target.value} : item))} />
                    {renderCountedField({
                      as: 'textarea',
                      defaultValue: '',
                      placeholder: 'Project details...',
                      maxLength: 400,
                      rows: 2,
                      onChange: (e) => setProjects(projects.map((item, i) => i === index ? {...item, desc: e.target.value} : item))
                    })}
                    {index !== projects.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addProject}>+ Add Project</button>
              </>
            )}
          </div>

          {/* SIMPLIFIED CERTIFICATES SECTION */}
          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Certificates</h2>
              <button className={`visibility-toggle ${visibleSections.certificates ? 'active' : 'hidden'}`} onClick={() => toggleSectionVisibility('certificates')}>
                {visibleSections.certificates ? "Exclude Section" : "Include Secction"}
              </button>
            </div>
            {visibleSections.certificates && (
              <div className='info-inputs'>
                {renderCountedField({
                  type: 'text',
                  defaultValue: '',
                  placeholder: 'e.g. AWS Certified, PMP, Meta Front-End',
                  maxLength: 300,
                  onChange: (e) => setCertificates(e.target.value)
                })}
                <p className='hint'>Separate with commas</p>
              </div>
            )}
          </div>

          <div className='form-section'>
  <div className="section-header-toggle">
    <h2>Skills Groups</h2>
    <button 
      className={`visibility-toggle ${visibleSections.skills ? 'active' : 'hidden'}`} 
      onClick={() => toggleSectionVisibility('skills')}
    >
      {visibleSections.skills ? "Exclude Section" : "Include Section"}
    </button>
  </div>
  
  {visibleSections.skills && (
    <>
      {skills.map((skillGroup, index) => (
        <div key={index} className='info-inputs dynamic-item'>
          <div className='section-item-header'>
            <label>Group #{index + 1}</label>
            {skills.length > 1 && (
              <button type="button" className='remove-btn' onClick={() => removeSkillGroup(index)}>Remove Group</button>
            )}
          </div>
          {renderCountedField({
            type: 'text',
            defaultValue: '',
            placeholder: 'Heading (e.g. Frontend)',
            maxLength: 30,
            onChange: (e) => handleSkillChange(index, 'category', e.target.value)
          })}
          {renderCountedField({
            type: 'text',
            defaultValue: '',
            placeholder: 'Skills (comma separated)',
            maxLength: 300,
            onChange: (e) => handleSkillChange(index, 'list', e.target.value)
          })}
          {index !== skills.length - 1 && <hr className='divider' />}
        </div>
      ))}
      <button className='add-btn' onClick={addSkillGroup}>+ Add Skill Group</button>
    </>
  )}
</div>

          <div className="resume-container">
            <div className="top-bar">
              <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
            </div>
          </div>    
        </div>
      </div>


      

      <div className='edit-right'>
        {/* Dynamic font size applied here via inline style */}
        <div 
          ref={contentRef} 
          className='template-show' 
          style={{ fontSize: `${fontSize}px` }}
        >
          {Selectedtemplate ? (
            <Selectedtemplate formdata={{
              personalInfo,
              links,
              education,
              experiences,
              projects,
              certificates,
              skills,
              template,
              fontSize,
              visibleSections,
              lineHeight,
            }} />
          ) : (
            <div>Template not found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Resumeedit;
