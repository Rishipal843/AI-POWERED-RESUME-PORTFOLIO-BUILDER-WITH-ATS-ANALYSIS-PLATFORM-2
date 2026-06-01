import React, { useContext } from "react";
import user_context from "../../UseContext";
import PaginatedTemplate from "./PaginatedTemplate";

export default function Minimal({ formdata: propFormdata }) {
  const { formdata: contextFormdata } = useContext(user_context);
  const data = propFormdata || contextFormdata;

  const {
    personalInfo,
    education,
    experiences,
    projects,
    certificates,
    skills,
    visibleSections,
    fontSize,
    lineHeight,
    links,
  } = data || {};

  const base = fontSize || 14;
  const lh = lineHeight || 1.35;

  const activeLinks = Object.keys(links || {})
    .filter((key) => links?.[key]?.active && links?.[key]?.url)
    .map((key) => {
      const url = links[key].url;

      if (key === "email") {
        return (
          <a key={key} href={`mailto:${url}`} style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }}>
            {url}
          </a>
        );
      }

      if (key === "mobile" || key === "address") {
        return <span key={key} style={{ wordBreak: "break-all" }}>{url}</span>;
      }

      return (
        <a
          key={key}
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }}
        >
          {key}
        </a>
      );
    });

  const hasText = (value) => String(value || "").trim().length > 0;
  const hasAnyText = (item, fields) => fields.some((field) => hasText(item?.[field]));

  const splitTextIntoChunks = (text, maxChars = 120) => {
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

  const styles = {
    sheet: {
      padding: "15mm",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      color: "#333",
    },
    headerBanner: {
      padding: `0 0 ${base * 1.6}px`,
      textAlign: "center",
    },
    nameHeader: {
      fontSize: `${base * 2.45}px`,
      fontWeight: "900",
      margin: 0,
      marginBottom: "8px",
      color: "#343434",
      letterSpacing: "5px",
      textTransform: "uppercase",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal",
    },
    jobTitleHeader: {
      fontSize: `${base * 1}px`,
      color: "#6b6b6b",
      margin: 0,
      letterSpacing: "1.8px",
      textTransform: "uppercase",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal",
    },
    contactBar: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "7px",
      padding: "9px 0 18px",
      borderTop: "1px solid #d8d8d8",
      borderBottom: "1px solid #d8d8d8",
      fontSize: `${base * 0.62}px`,
      color: "#5f6670",
    },
    contentPadding: {
      flex: 1,
    },
    sectionTitleBar: {
      padding: 0,
      marginTop: "0",
      marginBottom: "24px",
    },
    sectionTitle: {
      fontSize: `${base * 1.18}px`,
      fontWeight: "800",
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      color: "#343434",
    },
    descriptionText: {
      fontSize: `${base * 0.88}px`,
      lineHeight: Math.max(lh, 1.45),
      color: "#555",
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal",
    },
    boldLabel: {
      fontWeight: "bold",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },
    itemWrapper: {
      marginBottom: "20px",
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
    },
    dateText: {
      flexShrink: 0,
      textAlign: "right",
      fontSize: `${base * 0.72}px`,
      color: "#333",
      fontWeight: "700",
      lineHeight: lh,
    },
  };

  const header = (
    <>
      <div style={styles.headerBanner}>
        <h1 style={styles.nameHeader}>{personalInfo?.fullName}</h1>
        <p style={styles.jobTitleHeader}>{personalInfo?.title}</p>
      </div>

      <div style={styles.contactBar}>
        {activeLinks.length ? activeLinks.reduce((a, b) => [a, " | ", b]) : null}
      </div>
    </>
  );

  const blocks = [];
  const filledEducation = (education || []).filter((edu) =>
    hasAnyText(edu, ["school", "degree", "startDate", "endDate", "description"])
  );
  const filledSkills = (skills || []).filter((skill) =>
    hasAnyText(skill, ["category", "list"])
  );
  const filledExperiences = (experiences || []).filter((exp) =>
    hasAnyText(exp, ["company", "role", "startDate", "endDate", "desc"])
  );
  const filledProjects = (projects || []).filter((project) =>
    hasAnyText(project, ["title", "link", "desc"])
  );

  if (visibleSections?.summary && personalInfo?.summary) {
    const summaryChunks = splitTextIntoChunks(personalInfo.summary, 170);

    blocks.push({
      id: "summary-header",
      keepWithNext: summaryChunks.length > 0,
      keepSectionTogether: true,
      sectionGroup: "summary",
      node: (
        <div style={styles.sectionTitleBar}>
          <h2 style={styles.sectionTitle}>Profile Summary</h2>
        </div>
      ),
    });

    summaryChunks.forEach((chunk, chunkIndex) => {
      blocks.push({
        id: `summary-${chunkIndex}`,
        sectionGroup: "summary",
        node: (
          <p
            style={{
              ...styles.descriptionText,
              margin: 0,
              marginBottom: chunkIndex === summaryChunks.length - 1 ? "28px" : "8px",
            }}
          >
            {chunk}
          </p>
        ),
      });
    });
  }

  if (visibleSections?.experience && filledExperiences.length > 0) {
    blocks.push({
      id: "experience-section",
      keepSectionTogether: true,
      sectionGroup: "experience-section",
      node: (
        <div>
          <div style={styles.sectionTitleBar}>
            <h2 style={styles.sectionTitle}>Work Experience</h2>
          </div>

          {filledExperiences.map((exp, i) => {
            const descriptionChunks = splitTextIntoChunks(exp.desc, 170);

            return (
              <div key={`experience-${i}`} style={{ ...styles.itemWrapper, marginBottom: "28px" }}>
                <div style={styles.itemHeader}>
                  <span style={styles.boldLabel}>{exp.role}</span>
                  {(exp.startDate || exp.endDate) && (
                    <span style={styles.dateText}>
                      {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p style={{ ...styles.descriptionText, margin: "4px 0 0", fontStyle: "italic" }}>
                    {exp.company}
                  </p>
                )}
                {descriptionChunks.map((chunk, chunkIndex) => (
                  <p
                    key={`experience-${i}-desc-${chunkIndex}`}
                    style={{
                      ...styles.descriptionText,
                      margin: 0,
                      marginTop: chunkIndex === 0 ? "10px" : 0,
                      marginBottom: chunkIndex === descriptionChunks.length - 1 ? 0 : "8px",
                    }}
                  >
                    {chunk}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      ),
    });
  }

  if (visibleSections?.education && filledEducation.length > 0) {
    blocks.push({
      id: "education-header",
      keepWithNext: true,
      keepSectionTogether: filledEducation.length > 0,
      sectionGroup: "education-0",
      node: (
        <div style={styles.sectionTitleBar}>
          <h2 style={styles.sectionTitle}>Education</h2>
        </div>
      ),
    });

    filledEducation.forEach((edu, i) => {
      const descriptionChunks = splitTextIntoChunks(edu.description, 170);

      blocks.push({
        id: `education-${i}-head`,
        keepWithNext: descriptionChunks.length > 0,
        keepSectionTogether: i > 0,
        sectionGroup: `education-${i}`,
        node: (
          <div style={{ ...styles.itemWrapper, marginBottom: descriptionChunks.length ? "4px" : "14px" }}>
            <div style={styles.itemHeader}>
              <span style={styles.boldLabel}>{edu.degree}</span>
              {(edu.startDate || edu.endDate) && (
                <span style={styles.dateText}>
                  {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                </span>
              )}
            </div>
            {edu.school && <p style={{ ...styles.descriptionText, margin: "4px 0 0" }}>{edu.school}</p>}
          </div>
        ),
      });

      descriptionChunks.forEach((chunk, chunkIndex) => {
        blocks.push({
          id: `education-${i}-desc-${chunkIndex}`,
          sectionGroup: `education-${i}`,
          node: (
            <p
              style={{
                ...styles.descriptionText,
                margin: 0,
                marginBottom: chunkIndex === descriptionChunks.length - 1 ? "28px" : "8px",
              }}
            >
              {chunk}
            </p>
          ),
        });
      });
    });
  }

  if (visibleSections?.projects && filledProjects.length > 0) {
    blocks.push({
      id: "projects-header",
      keepWithNext: true,
      keepSectionTogether: true,
      sectionGroup: "project-0",
      node: (
        <div style={styles.sectionTitleBar}>
          <h2 style={styles.sectionTitle}>Projects</h2>
        </div>
      ),
    });

    filledProjects.forEach((project, i) => {
      const descriptionChunks = splitTextIntoChunks(project.desc, 170);

      blocks.push({
        id: `project-${i}`,
        keepSectionTogether: i > 0,
        sectionGroup: `project-${i}`,
        node: (
          <div style={{ ...styles.itemWrapper, marginBottom: "28px" }}>
            <p style={{ ...styles.boldLabel, margin: 0 }}>
              {project.title}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", fontSize: `${base * 0.7}px`, marginLeft: "5px" }}
                >
                  (Link)
                </a>
              )}
            </p>
            {descriptionChunks.map((chunk, chunkIndex) => (
              <p
                key={`project-${i}-desc-${chunkIndex}`}
                style={{
                  ...styles.descriptionText,
                  margin: 0,
                  marginTop: chunkIndex === 0 ? "10px" : 0,
                  marginBottom: chunkIndex === descriptionChunks.length - 1 ? 0 : "8px",
                }}
              >
                {chunk}
              </p>
            ))}
          </div>
        ),
      });
    });
  }

  if (visibleSections?.certificates && certificates) {
    const certificateChunks = splitTextIntoChunks(certificates, 170);

    blocks.push({
      id: "certificates-header",
      keepWithNext: certificateChunks.length > 0,
      keepSectionTogether: true,
      sectionGroup: "certificates",
      node: (
        <div style={styles.sectionTitleBar}>
          <h2 style={styles.sectionTitle}>Certificates</h2>
        </div>
      ),
    });

    certificateChunks.forEach((chunk, chunkIndex) => {
      blocks.push({
        id: `certificate-${chunkIndex}`,
        sectionGroup: "certificates",
        node: (
          <p
             style={{
              ...styles.descriptionText,
              margin: 0,
              marginBottom: chunkIndex === certificateChunks.length - 1 ? "28px" : "8px",
            }}
          >
            {chunk}
          </p>
        ),
      });
    });
  }

  if (visibleSections?.skills && filledSkills.length > 0) {
    blocks.push({
      id: "skills-header",
      keepWithNext: true,
      keepSectionTogether: true,
      sectionGroup: "skills",
      node: (
        <div style={styles.sectionTitleBar}>
          <h2 style={styles.sectionTitle}>Skills</h2>
        </div>
      ),
    });

    filledSkills.forEach((skill, i) => {
      const skillChunks = splitTextIntoChunks(skill.list, 170);

      if (!skillChunks.length && skill.category) {
        blocks.push({
          id: `skill-${i}-category`,
          sectionGroup: "skills",
          node: (
            <p style={{ ...styles.descriptionText, margin: 0, marginBottom: "8px" }}>
              <strong>{skill.category}</strong>
            </p>
          ),
        });
      }

      skillChunks.forEach((chunk, chunkIndex) => {
        blocks.push({
          id: `skill-${i}-${chunkIndex}`,
          sectionGroup: "skills",
          node: (
            <p
              style={{
                ...styles.descriptionText,
                margin: 0,
                marginBottom: chunkIndex === skillChunks.length - 1 ? "8px" : "4px",
              }}
            >
              {chunkIndex === 0 && skill.category ? (
                <>
                  <strong>{`${skill.category}: `}</strong>
                  {chunk}
                </>
              ) : (
                chunk
              )}
            </p>
          ),
        });
      });
    });
  }

  return (
    <PaginatedTemplate
      header={header}
      blocks={blocks}
      pageStyle={styles.sheet}
      firstPageContentStyle={styles.contentPadding}
      nextPageContentStyle={styles.contentPadding}
      pageBottomReserve={96}
      splitSafetyBuffer={96}
    />
  );
}
