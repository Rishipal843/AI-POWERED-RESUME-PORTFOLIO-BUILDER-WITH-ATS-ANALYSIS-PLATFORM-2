import React, { useContext, useEffect, useState } from 'react';
import './portfolioedit.css'; 
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Portfolioregistry } from './Portfolioregistry';
import user_context from '../../../UseContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Portfolioupdate = () => {
    const navigate = useNavigate();
    const { setportdata } = useContext(user_context);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const eemail = Cookies.get("username");

    // --- 1. INITIAL STATES ---
    const [slug, setSlug] = useState('');
    const [navbar, setNavbar] = useState({});
    const [hero, setHero] = useState({});
    const [bgImages, setBgImages] = useState([]);
    const [about, setAbout] = useState({});
    const [stats, setStats] = useState([]);
    const [techStack, setTechStack] = useState([]);
    const [journey, setJourney] = useState([]);
    const [projects, setProjects] = useState([]);
    const [contact, setContact] = useState([]);
    const [template, setTemplate] = useState('dark');

    // --- 2. FETCH DATA FROM DATABASE ---
    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/portfolioid/${id}`);
                const result = res.data;

                if (result.statuscode === 1) {
                    const data = result.data;
                    // Hydrate all states with fetched data
                    setSlug(data.slug || '');
                    setTemplate(data.template || 'dark');
                    setNavbar(data.navbar || { logo: '' });
                    setHero(data.hero || { name: '', headline: '', subheadline: '', status: '' });
                    setAbout(data.about || { description: '', profilePic: '' });
                    setBgImages(data.bgImages || [{ url: '' }]);
                    setStats(data.stats || []);
                    setTechStack(data.techStack || []);
                    setJourney(data.journey || []);
                    setProjects(data.projects || []);
                    setContact(data.contact || []);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
            }
        };
        if (id) fetchResponse();
    }, [id]);


    useEffect(() => {
        setportdata({ slug, navbar, hero, bgImages, about, stats, techStack, journey, projects, contact, template });
    }, [slug, navbar, hero, bgImages, about, stats, techStack, journey, projects, contact, template, setportdata]);


    const handleImageUpload = (callback) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(file);
        }
    };

//     const handleUpdate = async () => {
// const formdata=new FormData();
//         formdata.append("id", id);
//         formdata.append("email", eemail);
//         formdata.append("slug", slug);
//         formdata.append("template", template);
//         formdata.append("navbar", JSON.stringify(navbar));
//         formdata.append("hero", JSON.stringify(hero));
//         formdata.append("about", JSON.stringify(about));
//         formdata.append("stats", JSON.stringify(stats));
//         formdata.append("techStack", JSON.stringify(techStack));
//         formdata.append("journey", JSON.stringify(journey));
//         formdata.append("projects", JSON.stringify(projects));
//         formdata.append("contact", JSON.stringify(contact));
//         formdata.append("bgImages", JSON.stringify(bgImages));

//         try {
//             const request = await axios.put(`http://localhost:8000/api/updateportfolio/${id}`, formdata);
//             if (request.data.statuscode === 1) {
//                 alert("Portfolio updated successfully!");
//                 navigate("/userportfolios");
//             }
//         } catch (err) {
//             alert("Update failed.");
//             console.error(err);
//         }
//     };

     const handleUpdate = async () => {
    const payload = {
        email: eemail,
        slug,
        template,
        navbar,
        hero,
        about,
        stats,
        techStack,
        journey,
        projects,
        contact,
        bgImages
    }

    const request = await axios.put(
        `http://localhost:8000/api/updateportfolio/${id}`,
        payload,
    )

    const result = request.data

    if (result.statuscode == 1) {
        alert("Portfolio saved successfully!")
        navigate(-1)
    } 
}

    const Selectedportfolio = Portfolioregistry[template];

    return (
        <div className='edit-page-container'>
            <aside className='edit-panel'>
                <div className='panel-header'>
                    <h2>Update Portfolio</h2>
                    <button className='save-btn' onClick={handleUpdate}>Update Changes</button>
                </div>

                <div className='edit-sections-wrapper'>
                    {/* PORTFOLIO SLUG */}
                    <div className='form-section'>
                        <h2>Portfolio Name (Slug)</h2>
                        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>

                    {/* NAVBAR */}
                    <div className='form-section'>
                        <h2>1. Navbar</h2>
                        <label>Logo Text</label>
                        <input type="text" value={navbar.logo} onChange={(e) => setNavbar({ logo: e.target.value })} />
                    </div>

                    {/* HERO SECTION */}
                    <div className='form-section'>
                        <h2>2. Hero Section</h2>
                        <label>Status</label>
                        <input type="text" value={hero.status} onChange={(e) => setHero({ ...hero, status: e.target.value })} />
                        <label>Full Name</label>
                        <input type="text" value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
                        <label>Headline</label>
                        <input type="text" value={hero.headline} onChange={(e) => setHero({ ...hero, headline: e.target.value })} />
                        <label>Subheadline</label>
                        <textarea rows={2} value={hero.subheadline} onChange={(e) => setHero({ ...hero, subheadline: e.target.value })} />
                        
                        <label>Background Images</label>
                        {bgImages.map((img, i) => (
                            <div key={i} className="upload-row">
                                <input type="file" accept="image/*" onChange={handleImageUpload((res) => {
                                    const newBgs = [...bgImages];
                                    newBgs[i].url = res;
                                    setBgImages(newBgs);
                                })} />
                                {img.url && <img src={img.url} className="preview-small" alt="bg" />}
                                <button className='remove-btn' onClick={() => setBgImages(bgImages.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setBgImages([...bgImages, { url: '' }])}>+ Add Background</button>
                    </div>

                    {/* ABOUT ME */}
                    <div className='form-section'>
                        <h2>3. About Me</h2>
                        <label>Profile Picture</label>
                        <div className='file-input-group'>
                            <input type="file" accept="image/*" onChange={handleImageUpload((res) => setAbout({ ...about, profilePic: res }))} />
                            {about.profilePic && <img src={about.profilePic} className="preview-small rounded" alt="profile" />}
                        </div>
                        <label>Biography</label>
                        <textarea rows={4} value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} />
                        
                        <label>Stats</label>
                        {stats.map((stat, i) => (
                            <div key={i} className="row-inputs">
                                <input placeholder="Label" value={stat.label} onChange={(e) => setStats(stats.map((s, idx) => idx === i ? { ...s, label: e.target.value } : s))} />
                                <input placeholder="Value" value={stat.value} onChange={(e) => setStats(stats.map((s, idx) => idx === i ? { ...s, value: e.target.value } : s))} />
                                <button className='remove-btn' onClick={() => setStats(stats.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setStats([...stats, { label: '', value: '' }])}>+ Add Stat</button>
                    </div>

                    {/* TECH STACK */}
                    <div className='form-section'>
                        <h2>4. Tech Stack</h2>
                        {techStack.map((skill, i) => (
                            <div key={i} className="row-inputs-tech">
                                <input placeholder="Skill" value={skill.name} onChange={(e) => setTechStack(techStack.map((s, idx) => idx === i ? { ...s, name: e.target.value } : s))} />
                                <input type="number" placeholder="%" value={skill.level} onChange={(e) => setTechStack(techStack.map((s, idx) => idx === i ? { ...s, level: e.target.value } : s))} />
                                <button className='remove-btn' onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))}>×</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setTechStack([...techStack, { name: '', level: 80 }])}>+ Add Skill</button>
                    </div>

                    {/* JOURNEY */}
                    <div className='form-section'>
                        <h2>5. My Journey</h2>
                        {journey.map((item, i) => (
                            <div key={i} className="dynamic-card">
                                <input placeholder="Duration" value={item.duration} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? { ...j, duration: e.target.value } : j))} />
                                <input placeholder="Institution" value={item.institution} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? { ...j, institution: e.target.value } : j))} />
                                <input placeholder="Title" value={item.title} onChange={(e) => setJourney(journey.map((j, idx) => idx === i ? { ...j, title: e.target.value } : j))} />
                                <button className='remove-btn-text' onClick={() => setJourney(journey.filter((_, idx) => idx !== i))}>Remove Entry</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setJourney([...journey, { duration: '', title: '', institution: '' }])}>+ Add Step</button>
                    </div>

                    {/* PROJECTS */}
                    {/* SECTION 6: PROJECTS */}
<div className='form-section'>
    <h2>6. Projects</h2>
    {projects.map((proj, i) => (
        <div key={i} className="dynamic-card" style={{borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px'}}>
            <label>Project Title</label>
            <input 
                placeholder="Project Title" 
                value={proj.title} 
                onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))} 
            />

            <label>Project Thumbnail</label>
            <div className='file-input-group'>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload((res) => {
                        const newProjs = [...projects];
                        newProjs[i].image = res; // Updates the Base64 string in state
                        setProjects(newProjs);
                    })} 
                />
                {/* THIS IS WHERE THE IMAGE SHOWS UP */}
                {proj.image && (
                    <div className="image-preview-wrapper">
                        <img src={proj.image} className="preview-small" alt="Project Thumb" />
                        <p style={{fontSize: '10px', color: '#666'}}>Current Image</p>
                    </div>
                )}
            </div>

            <label>Description</label>
            <textarea 
                placeholder="Desc (Max 25 words)" 
                rows={2} 
                value={proj.desc} 
                onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, desc: e.target.value } : p))} 
            />

            <div className='row-inputs'>
                <input 
                    placeholder="Live Link" 
                    value={proj.liveLink} 
                    onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, liveLink: e.target.value } : p))} 
                />
                <input 
                    placeholder="Source Code" 
                    value={proj.sourceCode} 
                    onChange={(e) => setProjects(projects.map((p, idx) => idx === i ? { ...p, sourceCode: e.target.value } : p))} 
                />
            </div>
            <button className='remove-btn-text' onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}>
                Remove Project
            </button>
        </div>
    ))}
    <button className='add-btn' onClick={() => setProjects([...projects, { title: '', tech: '', desc: '', image: '', liveLink: '', sourceCode: '' }])}>
        + Add Project
    </button>
</div>

                    {/* CONTACT */}
                    <div className='form-section'>
                        <h2>7. Contact Links</h2>
                        {contact.map((item, i) => (
                            <div key={i} className="dynamic-card">
                                <input placeholder="Platform" value={item.platform} onChange={(e) => setContact(contact.map((c, idx) => idx === i ? { ...c, platform: e.target.value } : c))} />
                                <input placeholder="Value (Link/Email)" value={item.value} onChange={(e) => setContact(contact.map((c, idx) => idx === i ? { ...c, value: e.target.value } : c))} />
                                <button className='remove-btn-text' onClick={() => setContact(contact.filter((_, idx) => idx !== i))}>Remove Link</button>
                            </div>
                        ))}
                        <button className='add-btn' onClick={() => setContact([...contact, { platform: '', value: '' }])}>+ Add Contact</button>
                    </div>
                </div>
            </aside>

            {/* PREVIEW PANEL */}
            <main className='preview-panel'>
                <div className='preview-window-canvas'>
                    <div className='preview-frame-container'>
                        <div className='virtual-window'>
                            {Selectedportfolio ? <Selectedportfolio /> : <div>Loading Template...</div>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Portfolioupdate;