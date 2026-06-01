import React, { useContext, useEffect, useState, useRef } from 'react';
import './portfolioedit.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Portfolioregistry } from './Portfolioregistry';
import user_context from '../../../UseContext';
import Cookies  from 'js-cookie';
import axios from 'axios';

const Portfolioedit = () => {
    const navigate = useNavigate();

    const { portdata, setportdata } = useContext(user_context);
    const [searchParams] = useSearchParams();
    const template = searchParams.get('template') || 'dark';


    const eemail = Cookies.get("username")
    console.log("Email from cookies:", eemail);


    // --- SIMPLE STATE VARIABLES ---
    const [slug, setSlug] = useState('');

    const [navbar, setNavbar] = useState({ logo: 'logo' });
    const [hero, setHero] = useState({
        name: '',
        headline: '',
        subheadline: '',
        status: '',
        // ctaText: 'Explore Work',
        // ctaLink: '#projects'
    });
    const [bgImages, setBgImages] = useState([{ url: '' }]);
    const [about, setAbout] = useState({
        description: '',
        profilePic: ''
    });
    const [stats, setStats] = useState([{ label: '', value: '' }, { label: '', value: '' }]);
    const [techStack, setTechStack] = useState([{ name: '', level: "" }, { name: '', level:"" }]);
    const [journey, setJourney] = useState([{ duration: '', title: '', institution: '' }]);
    const [projects, setProjects] = useState([{ title: '', tech: '', desc: '', image: '', liveLink: '', sourceCode: '' }]);
    const [contact, setContact] = useState([
    { platform: '', value: '' },
    { platform: '', value: '' },
    { platform: '', value: '' }
]);
    // --- AUTO-SYNC WITH CONTEXT ---
    useEffect(() => {
        setportdata({
            slug,navbar, hero, bgImages, about, stats, techStack, journey, projects, contact, template
        });
    }, [slug, navbar, hero, bgImages, about, stats, techStack, journey, projects, contact, template, setportdata]);




    // --- IMAGE UPLOAD HANDLER ---
    const handleImageUpload = (callback) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(file);
        }
    };


    // --- SUBMIT HANDLER ---
    const submit = async() => {

        if (!slug || slug.trim() === "") {
        alert("Portfolio Name (Slug) is required!");
        return; 
    }

    // Double check formatting before sending to backend
    const finalSlug = slug.trim().replace(/\s+/g, '-').toLowerCase();


        const formdata=new FormData()
        formdata.append("email", eemail)
        formdata.append("slug", finalSlug)
        formdata.append("template", template)
        formdata.append("navbar", JSON.stringify(navbar))
        formdata.append("hero", JSON.stringify(hero))
        formdata.append("about", JSON.stringify(about))
        formdata.append("stats", JSON.stringify(stats))
        formdata.append("techStack", JSON.stringify(techStack))
        formdata.append("journey", JSON.stringify(journey))
        formdata.append("projects", JSON.stringify(projects))
        formdata.append("contact", JSON.stringify(contact))
        formdata.append("bgImages",JSON.stringify(bgImages))
        const request = await axios.post("https://ai-powered-resume-portfolio-builder-with.onrender.com/api/portfolio", 
            formdata
        )
        const result = await request.data
        if(result.statuscode == 1){
            alert("Portfolio saved successfully!")
            setHero({
                name: 'john doe',
        headline: 'MERN Stack Developer',
        subheadline: 'Building digital experiences with MongoDB, Express, React, and Node.js.',
        status: 'Available for Freelance'
            })
            navigate(-2)
        } else{
            alert("Error saving portfolio. Please try again.")
        }
    };







    const Selectedportfolio = Portfolioregistry[template];




    return (
        <div className='edit-page-container'>
            <aside className='edit-panel'>
                <div className='panel-header'>
                    <h2>Portfolio Customizer</h2>
                    <button className='save-btn' onClick={submit}>Save Progress</button>
                </div>

                <div className='edit-sections-wrapper'>
                    <div className='form-section'>
                        <h2>Portfolio Name</h2>
                        <label >Enter your portfolio Name</label>
                        <input type="text " required placeholder='eg. joe-deo' onChange={(e)=> setSlug(e.target.value)} />
                    </div>
                    {/* SECTION 1: NAVBAR */}
                    <div className='form-section'>
                        <h2>1. Navbar</h2>
                        <label>Logo Text</label>
                        <input type="text"   onChange={(e) => setNavbar({logo: e.target.value})} />
                    </div>

                    {/* SECTION 2: HERO */}
                    <div className='form-section'>
                        <h2>2. Hero Section</h2>
                        <label >Status</label>
                        <input type="text" placeholder='e.g. Available for Freelance'   onChange={(e) => setHero({...hero, status: e.target.value})} />
                        <label>Full Name</label>
                        <input type="text" placeholder='e.g. John Doe'  onChange={(e) => setHero({...hero, name: e.target.value})} />
                        <label>Headline</label>
                        <input type="text" placeholder='e.g. Mern Stack Developer' onChange={(e) => setHero({...hero, headline: e.target.value})} />
                        <label>Subheadline</label>
                        <textarea rows={2} placeholder='e.g. Building digital experiences with MongoDB, Express, React, and Node.js.'  onChange={(e) => setHero({...hero, subheadline: e.target.value})} />
                        {/* <label>CTA Text</label>
                        <input type="text" placeholder='e.g. Explore Work' onChange={(e) => setHero({...hero, ctaText: e.target.value})} />
                        <label>CTA Link</label>
                        <input type="text" placeholder='e.g. #projects' onChange={(e) => setHero({...hero, ctaLink: e.target.value})} /> */}
                        
                        <label>Background Layers</label>
                        {bgImages.map((img, i) => (
                            <div key={i} className="upload-row">
                                <div className='file-input-group'>
                                    <input type="file" accept="image/*" onChange={handleImageUpload((res) => {
                                        const newBgs = [...bgImages];
                                        newBgs[i].url = res;
                                        setBgImages(newBgs);
                                    })} />
                                    {img.url && <img src={img.url} className="preview-small" alt="" />}
                                </div>
                                <button className='remove-btn' onClick={() => setBgImages(bgImages.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setBgImages([...bgImages, {url: ''}])}>+ Add Background</button>
                    </div>

                    {/* SECTION 3: ABOUT */}
                    <div className='form-section'>
                        <h2>3. About Me</h2>
                        <label>Profile Picture</label>
                        <div className='file-input-group'>
                            <input type="file" accept="image/*" onChange={handleImageUpload((res) => setAbout({...about, profilePic: res}))} />
                            {about.profilePic && <img src={about.profilePic} className="preview-small rounded" alt="" />}
                        </div>
                        
                        <label style={{marginTop: '10px'}}>Professional Stats</label>
                        {stats.map((stat, i) => (
                            <div key={i} className="row-inputs">
                                <input placeholder="Label"  onChange={(e) => setStats(stats.map((s, idx) => idx === i ? {...s, label: e.target.value} : s))} />
                                <input placeholder="Value"  onChange={(e) => setStats(stats.map((s, idx) => idx === i ? {...s, value: e.target.value} : s))} />
                                <button className='remove-btn' onClick={() => setStats(stats.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setStats([...stats, {label: '', value: ''}])}>+ Add Stat</button>

                        <label style={{marginTop: '10px'}}>Biography</label>
                        <textarea rows={4}  onChange={(e) => setAbout({...about, description: e.target.value})} />
                    </div>

                    {/* SECTION 4: TECH STACK */}
                    <div className='form-section'>
                        <h2>4. Tech Stack</h2>
                        {techStack.map((skill, i) => (
                            <div key={i} className="row-inputs-tech">
                                <input placeholder="Skill"  onChange={(e) => setTechStack(techStack.map((s, idx) => idx === i ? {...s, name: e.target.value} : s))} />
                                <input type="number" placeholder="%"  onChange={(e) => setTechStack(techStack.map((s, idx) => idx === i ? {...s, level: e.target.value} : s))} />
                                <button className='remove-btn' onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setTechStack([...techStack, {name: '', level: 80}])}>+ Add Skill</button>
                    </div>

                    {/* SECTION 5: JOURNEY */}
                    <div className='form-section'>
                        <h2>5. My Journey</h2>
                        {journey.map((item, i) => (
                            <div key={i} className="dynamic-card">
                                <input placeholder="Duration (e.g. 2022-2026)" value={item.duration} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? {...j, duration: e.target.value} : j))} />
                                <input placeholder="Organization" value={item.institution} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? {...j, institution: e.target.value} : j))} />
                                <input placeholder="Title / Degree" value={item.title} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? {...j, title: e.target.value} : j))} />
                                <button className='remove-btn-text' onClick={() => setJourney(journey.filter((_, idx) => idx !== i))}>Remove Entry</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setJourney([...journey, {duration: '', title: '', institution: ''}])}>+ Add Step</button>
                    </div>

                    {/* SECTION 6: PROJECTS */}
                    <div className='form-section'>
                        <h2>6. Projects</h2>
                        {projects.map((proj, i) => (
                            <div key={i} className="dynamic-card">
                                <input placeholder="Project Title" value={proj.title} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? {...p, title: e.target.value} : p))} />
                                <label>Project Thumbnail</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload((res) => {
                                    const newProjs = [...projects];
                                    newProjs[i].image = res;
                                    setProjects(newProjs);
                                })} />
                                <textarea placeholder="Desc (Max 25 words)" rows={2} value={proj.desc} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? {...p, desc: e.target.value} : p))} />
                                <div className='row-inputs'>
                                    <input placeholder="Live Link" value={proj.liveLink} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? {...p, liveLink: e.target.value} : p))} />
                                    <input placeholder="Source" value={proj.sourceCode} onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? {...p, sourceCode: e.target.value} : p))} />
                                </div>
                                <button className='remove-btn-text' onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}>Remove Project</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setProjects([...projects, {title: '', tech: '', desc: '', image: '', liveLink: '', sourceCode: ''}])}>+ Add Project</button>
                    </div>

                    {/* SECTION 7: CONTACT */}
<div className='form-section'>
    <h2>7. Contact Links</h2>
    {contact.map((item, i) => (
        <div key={i} className="dynamic-card">
            <div className='row-inputs'>
                <input 
                    placeholder="Platform (e.g. GitHub)" 
                    value={item.platform} 
                    onChange={(e) => setContact(contact.map((c, idx) => idx === i ? {...c, platform: e.target.value} : c))} 
                />
                <input 
                    placeholder="Icon (Emoji)" 
                    style={{width: '60px'}}
                    value={item.icon} 
                    onChange={(e) => setContact(contact.map((c, idx) => idx === i ? {...c, icon: e.target.value} : c))} 
                />
            </div>
            <input 
                placeholder="Link or Detail" 
                value={item.value} 
                onChange={(e) => setContact(contact.map((c, idx) => idx === i ? {...c, value: e.target.value} : c))} 
            />
            <button className='remove-btn-text' onClick={() => setContact(contact.filter((_, idx) => idx !== i))}>
                Remove Link
            </button>
        </div>
    ))}
    <button className='add-btn' onClick={() => setContact([...contact, {platform: '', value: '', icon: '🔗'}])}>
        + Add Contact Platform
    </button>
</div>

                </div>
            </aside>

            {/* LIVE PREVIEW AREA */}
            <main className='preview-panel'>
                <div className='preview-window-canvas'>
                    <div className='preview-frame-container'>
                        <div className='virtual-window'>
                            
                            {Selectedportfolio ? <Selectedportfolio /> : <div>Template not found</div>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Portfolioedit;