import React, { useContext } from "react";
import user_context from "../../UseContext";
import PaginatedTemplate from "./PaginatedTemplate";

export default function Simple({ formdata: propFormdata }) {
  const { formdata: contextFormdata } = useContext(user_context);
  const data = propFormdata || contextFormdata;

  const {
    personalInfo,
    education,
    experiences,
    skills,
    projects,
    certificates,
    visibleSections,
    fontSize,
    lineHeight,
    links,
  } = data || {};

  const base = fontSize || 14;
  const lh = lineHeight || 1.4;
  const donnaBlue = "#4a90e2";

  const activeLinks = Object.keys(links || {})
    .filter((key) => links?.[key]?.active && links?.[key]?.url)
    .map((key) => links[key].url);

  const hasText = (value) => String(value || "").trim().length > 0;
  const hasAnyText = (item, fields) => fields.some((field) => hasText(item?.[field]));

  const sheetContainer = {
    padding: "15mm",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    color: "#333",
  };

  const styles = {
    nameHeader: {
      fontSize: `${base * 2.8}px`,
      fontWeight: "400",
      color: donnaBlue,
      textTransform: "uppercase",
      letterSpacing: "2px",
      marginBottom: "4px",
      wordBreak: "break-word",
    },
    jobTitle: {
      fontSize: `${base * 1.2}px`,
      color: "#555",
      textTransform: "uppercase",
      letterSpacing: "3px",
      marginBottom: "15px",
      wordBreak: "break-word",
    },
    headerContact: {
      fontSize: `${base * 0.8}px`,
      borderTop: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      padding: "8px 0",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "10px",
      color: "#666",
      marginBottom: "25px",
    },
    sectionTitle: {
      fontSize: `${base * 1.1}px`,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#222",
      marginBottom: "15px",
      letterSpacing: "1px",
    },
    sidebarItem: {
      marginBottom: "20px",
    },
    sidebarLabel: {
      fontSize: `${base * 0.9}px`,
      fontWeight: "700",
      color: "#444",
      wordBreak: "break-word",
    },
    sidebarSub: {
      fontSize: `${base * 0.8}px`,
      color: "#666",
      marginBottom: "10px",
      wordBreak: "break-word",
    },
    mainContentItem: {
      marginBottom: "25px",
    },
    expDate: {
      fontSize: `${base * 0.9}px`,
      color: "#888",
      marginBottom: "2px",
    },
    expTitle: {
      fontSize: `${base * 1}px`,
      fontWeight: "700",
      color: "#333",
      wordBreak: "break-word",
    },
    bulletList: {
      paddingLeft: "18px",
      marginTop: "5px",
      fontSize: `${base * 0.85}px`,
      color: "#444",
      lineHeight: lh,
      overflowWrap: "break-word",
      wordBreak: "break-word",
      whiteSpace: "normal",
    },
    pageContent: {
      display: "flex",
      gap: "40px",
      flex: 1,
    },
    leftColumn: {
      width: "35%",
    },
    rightColumn: {
      width: "65%",
      overflowWrap: "break-word",
      wordBreak: "break-word",
      whiteSpace: "normal",
    },
    referencesGrid: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    rowBlock: {
      display: "flex",
      gap: "40px",
    },
    projectTitle: {
      fontSize: `${base * 1}px`,
      fontWeight: "700",
      color: "#333",
      marginBottom: "5px",
      wordBreak: "break-word",
    },
    projectDesc: {
      fontSize: `${base * 0.85}px`,
      color: "#555",
      lineHeight: lh,
      marginBottom: "15px",
      wordBreak: "break-word",
    },
    projectItem: {
      marginBottom: "20px",
    },
  };

  const header = (
    <header>
      <h1 style={styles.nameHeader}>{personalInfo?.fullName}</h1>
      <p style={styles.jobTitle}>{personalInfo?.title}</p>
      <div style={styles.headerContact}>
        {activeLinks.length > 0 ? (
          activeLinks.map((link, i) => <span key={i}>{link}</span>)
        ) : null}
      </div>
    </header>
  );

  const splitTextIntoChunks = (text, maxChars = 95) => {
    if (!text) return [];

    const normalizedText = String(text).replace(/\r/g, "").trim();
    if (!normalizedText) return [];

    const chunks = [];
    const paragraphs = normalizedText
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(/\s+/).filter(Boolean);
      let currentChunk = "";

      words.forEach((word) => {
        if (word.length > maxChars) {
          if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = "";
          }

          for (let index = 0; index < word.length; index += maxChars) {
            chunks.push(word.slice(index, index + maxChars));
          }
          return;
        }

        const nextChunk = currentChunk ? `${currentChunk} ${word}` : word;
        if (nextChunk.length > maxChars) {
          if (currentChunk) chunks.push(currentChunk);
          currentChunk = word;
        } else {
          currentChunk = nextChunk;
        }
      });

      if (currentChunk) chunks.push(currentChunk);
    });

    return chunks;
  };

  const blocks = [];

  if (visibleSections?.summary && personalInfo?.summary) {
    blocks.push({
      id: "summary",
      node: (
        <section style={styles.mainContentItem}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p
            style={{
              fontSize: `${base * 0.9}px`,
              lineHeight: lh,
              overflowWrap: "break-word",
              wordBreak: "normal",
              hyphens: "none",
              margin: 0,
            }}
          >
            {personalInfo.summary}
          </p>
        </section>
      ),
    });
  }

  const filledSkills = (skills || []).filter((skill) =>
    hasAnyText(skill, ["category", "list"])
  );

  const filledEducation = (education || []).filter((edu) =>
    hasAnyText(edu, ["school", "degree", "startDate", "endDate", "description"])
  );

  const showEducation = visibleSections?.education && filledEducation.length > 0;
  const showSkills = visibleSections?.skills && filledSkills.length > 0;

  if (showEducation || showSkills) {
    blocks.push({
      id: "education-skills",
      node: (
        <div style={styles.rowBlock}>
          <div style={styles.leftColumn}>
            {showEducation && (
              <>
                <h2 style={styles.sectionTitle}>Education</h2>
                {filledEducation.map((edu, i) => {
                  const descriptionChunks = splitTextIntoChunks(edu.description, 45);

                  return (
                    <div key={`education-${i}`} style={styles.sidebarItem}>
                      <div style={styles.sidebarLabel}>{edu.school}</div>
                      <div style={styles.sidebarSub}>{edu.degree}</div>
                      <div style={styles.sidebarSub}>
                        {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                      </div>
                      {descriptionChunks.map((chunk, chunkIndex) => (
                        <div
                          key={`education-${i}-desc-${chunkIndex}`}
                          style={{
                            ...styles.sidebarSub,
                            marginBottom: chunkIndex === descriptionChunks.length - 1 ? "10px" : "3px",
                          }}
                        >
                          {chunk}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div style={styles.rightColumn}>
            {showSkills && (
              <>
                <h2 style={styles.sectionTitle}>Skills</h2>
                {filledSkills.map((skill, i) => (
                  <p
                    key={`skill-${i}`}
                    style={{
                      ...styles.bulletList,
                      paddingLeft: 0,
                      margin: 0,
                      marginBottom: "12px",
                    }}
                  >
                    <strong>{`${skill.category ? `${skill.category}: ` : ""}`}</strong>
                    {skill.list}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      ),
    });
  }

  const filledExperiences = (experiences || []).filter((exp) =>
    hasAnyText(exp, ["company", "role", "startDate", "endDate", "desc"])
  );

  if (visibleSections?.experience && filledExperiences.length > 0) {
    blocks.push({
      id: "work-experience-header",
      keepWithNext: true,
      node: (
        <section style={styles.mainContentItem}>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
        </section>
      ),
    });

    filledExperiences.forEach((exp, i) => {
      const descriptionChunks = splitTextIntoChunks(exp.desc, 135);

      blocks.push({
        id: `experience-${i}-head`,
        keepWithNext: descriptionChunks.length > 0,
        node: (
          <section style={{ ...styles.mainContentItem, marginBottom: descriptionChunks.length ? "4px" : "25px" }}>
            <div style={styles.projectItem}>
              <p style={styles.projectTitle}>{exp.role}</p>
              {exp.company && (
                <p style={{ ...styles.projectDesc, fontStyle: "italic", marginBottom: "8px" }}>
                  {exp.company}
                </p>
              )}
              {(exp.startDate || exp.endDate) && (
                <p style={{ ...styles.projectDesc, marginBottom: exp.desc ? "10px" : "0" }}>
                  ({exp.startDate} {`${exp.endDate ? `- ${exp.endDate}` : ""}`})
                </p>
              )}
            </div>
          </section>
        ),
      });

      descriptionChunks.forEach((chunk, chunkIndex) => {
        blocks.push({
          id: `experience-${i}-desc-${chunkIndex}`,
          node: (
            <p
              style={{
                ...styles.projectDesc,
                marginBottom: chunkIndex === descriptionChunks.length - 1 ? "25px" : "4px",
              }}
            >
              {chunk}
            </p>
          ),
        });
      });
    });
  }

  if (visibleSections?.projects && projects?.some((project) => project?.title || project?.desc)) {
    blocks.push({
      id: "projects-header",
      keepWithNext: true,
      node: (
        <section style={styles.mainContentItem}>
          <h2 style={styles.sectionTitle}>Projects</h2>
        </section>
      ),
    });

    projects.forEach((project, i) => {
      const descriptionChunks = splitTextIntoChunks(project.desc, 135);

      blocks.push({
        id: `project-${i}-head`,
        keepWithNext: descriptionChunks.length > 0,
        node: (
          <section style={{ ...styles.mainContentItem, marginBottom: descriptionChunks.length ? "4px" : "25px" }}>
            <div style={styles.projectItem}>
              <p style={styles.projectTitle}>{project.title}</p>
            </div>
          </section>
        ),
      });

      descriptionChunks.forEach((chunk, chunkIndex) => {
        blocks.push({
          id: `project-${i}-desc-${chunkIndex}`,
          node: (
            <p
              style={{
                ...styles.projectDesc,
                marginBottom: chunkIndex === descriptionChunks.length - 1 ? "25px" : "4px",
              }}
            >
              {chunk}
            </p>
          ),
        });
      });
    });
  }

  if (visibleSections?.certificates && certificates) {
    blocks.push({
      id: "certificates",
      node: (
        <section style={styles.mainContentItem}>
          <h2 style={styles.sectionTitle}>Certificates</h2>
          <p style={styles.projectDesc}>{certificates}</p>
        </section>
      ),
    });
  }

  return (
    <PaginatedTemplate
      header={header}
      blocks={blocks}
      pageStyle={sheetContainer}
      firstPageContentStyle={{ flex: 1 }}
      nextPageContentStyle={{ flex: 1 }}
    />
  );
}
