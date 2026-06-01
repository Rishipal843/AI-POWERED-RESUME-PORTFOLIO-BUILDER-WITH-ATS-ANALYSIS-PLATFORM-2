import React, { useContext } from "react";
import user_context from "../../UseContext";
import PaginatedTemplate from "./PaginatedTemplate";

export default function Classic({ formdata: propFormdata }) {
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
  } = data || {};

  const base = fontSize || 16;
  const lh = lineHeight || 1.5;
  const purpleTheme = "#7c4dff";

  const activeLinks = Object.keys(data?.links || {})
    .filter((key) => data?.links?.[key]?.active && data?.links?.[key]?.url)
    .map((key) => {
      const url = data?.links?.[key]?.url;
      const displayNames = {
        github: "GitHub",
        linkedin: "LinkedIn",
        website: "Website",
        instagram: "Instagram",
        email: "Email",
        mobile: "Mobile",
        address: "Address",
      };

      if (key === "email") {
        return (
          <a key={key} href={`mailto:${url}`} style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }}>
            {url}
          </a>
        );
      }

      if (key === "mobile" || key === "address") {
        return (
          <span key={key} style={{ wordBreak: "break-all" }}>
            {url}
          </span>
        );
      }

      return (
        <a
          key={key}
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", textDecoration: "none", wordBreak: "break-all" }}
        >
          {displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}
        </a>
      );
    });

  const hasText = (value) => String(value || "").trim().length > 0;
  const hasAnyText = (item, fields) => fields.some((field) => hasText(item?.[field]));

  const sheetContainer = {
    padding: "10mm",
    position: "relative",
  };

  const styles = {
    nameHeader: {
      fontSize: `${base * 2.2}px`,
      fontWeight: "700",
      color: purpleTheme,
      lineHeight: "1.1",
      textAlign: "center",
      marginBottom: "2px",
      wordBreak: "break-all",
      overflowWrap: "break-word",
      whiteSpace: "normal",
    },
    jobTitleHeader: {
      fontSize: `${base * 1.1}px`,
      fontWeight: "600",
      color: "#555",
      textAlign: "center",
      marginBottom: "5px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      wordBreak: "break-word",
      whiteSpace: "normal",
    },
    contactText: {
      fontSize: `${base * 0.8}px`,
      textAlign: "center",
      color: "#555",
      lineHeight: lh,
      marginBottom: "10px",
      marginLeft: "20px",
      marginRight: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "4px",
    },
    sectionHeader: {
      fontSize: `${base * 1.05}px`,
      color: purpleTheme,
      fontWeight: "bold",
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: "2px",
      marginBottom: `${lh * 4}px`,
      marginTop: `${lh * 5}px`,
      textTransform: "uppercase",
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "2px",
      gap: "15px",
    },
    titleWrapper: {
      flex: 1,
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal",
    },
    dateWrapper: {
      flexShrink: 0,
      textAlign: "right",
      minWidth: "100px",
    },
    companySubHeader: {
      fontSize: `${base * 0.85}px`,
      fontStyle: "italic",
      lineHeight: lh,
      margin: 0,
      color: "#444",
      wordBreak: "break-word",
      display: "block",
      width: "100%",
    },
    descriptionText: {
      fontSize: `${base * 0.85}px`,
      lineHeight: lh,
      color: "#333",
      marginTop: "4px",
      display: "block",
      width: "100%",
      wordBreak: "break-word",
    },
    boldLabel: {
      fontSize: `${base * 0.85}px`,
      fontWeight: "bold",
      lineHeight: lh,
      wordBreak: "break-word",
    },
    itemWrapper: {
      marginBottom: `${lh * 6}px`,
    },
    itemHeaderBlock: {
      marginBottom: "4px",
    },
    continuedDescription: {
      marginTop: 0,
      marginBottom: `${lh * 3}px`,
    },
    projectLink: {
      fontSize: `${base * 0.75}px`,
      color: "black",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  const header = (
    <>
      <header style={{ textAlign: "center" }}>
        <h1 style={styles.nameHeader}>{personalInfo?.fullName }</h1>
        <p style={styles.jobTitleHeader}>{personalInfo?.title }</p>
        <div style={styles.contactText}>
          {activeLinks.length > 0 ? activeLinks.reduce((prev, curr) => [prev, " | ", curr]) : null}
        </div>
      </header>
      <div style={{ borderTop: `1.5px solid ${purpleTheme}`, margin: "5px 0" }} />
    </>
  );

  const blocks = [];
  const filledExperiences = (experiences || []).filter((exp) =>
    hasAnyText(exp, ["company", "role", "startDate", "endDate", "desc"])
  );
  const filledEducation = (education || []).filter((edu) =>
    hasAnyText(edu, ["school", "degree", "startDate", "endDate", "description"])
  );
  const filledProjects = (projects || []).filter((project) =>
    hasAnyText(project, ["title", "link", "desc"])
  );
  const filledSkills = (skills || []).filter((skill) =>
    hasAnyText(skill, ["category", "list"])
  );

  const splitTextIntoChunks = (text, maxChars = 220) => {
    if (!text) return [];

    const normalizedText = text.replace(/\r/g, "").trim();
    if (!normalizedText) return [];

    const paragraphs = normalizedText
      .split("\n")
      .map((part) => part.trim())
      .filter(Boolean);

    const chunks = [];

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

        const candidate = currentChunk ? `${currentChunk} ${word}` : word;
        if (candidate.length > maxChars) {
          if (currentChunk) {
            chunks.push(currentChunk);
          }
          currentChunk = word;
        } else {
          currentChunk = candidate;
        }
      });

      if (currentChunk) {
        chunks.push(currentChunk);
      }
    });

    return chunks;
  };

  if (visibleSections?.summary && personalInfo?.summary) {
    blocks.push({
      id: "summary",
      node: (
        <section style={{ marginBottom: `${lh * 8}px` }}>
          <h2 style={styles.sectionHeader}>Professional Summary</h2>
          <p style={styles.descriptionText}>{personalInfo.summary}</p>
        </section>
      ),
    });
  }

  if (visibleSections?.experience && filledExperiences.length > 0) {
    filledExperiences.forEach((exp, index) => {
      const descriptionChunks = splitTextIntoChunks(exp.desc, 240);

      blocks.push({
        id: `experience-${index}-header`,
        keepWithNext: descriptionChunks.length > 0,
        node: (
          <div style={styles.itemHeaderBlock}>
            {index === 0 && <h2 style={styles.sectionHeader}>Work Experience</h2>}
            <div style={styles.itemHeader}>
              <div style={styles.titleWrapper}>
                <span style={styles.boldLabel}>{exp.role }</span>
              </div>
              <div style={styles.dateWrapper}>
                <span style={styles.boldLabel}>{exp.startDate} - {exp.endDate }</span>
              </div>
            </div>
            <p style={styles.companySubHeader}>{exp.company }</p>
          </div>
        ),
      });

      if (descriptionChunks.length > 0) {
        descriptionChunks.forEach((chunk, chunkIndex) => {
          const isLastChunk = chunkIndex === descriptionChunks.length - 1;
          blocks.push({
            id: `experience-${index}-desc-${chunkIndex}`,
            node: (
              <p
                style={{
                  ...styles.descriptionText,
                  ...(isLastChunk ? styles.itemWrapper : styles.continuedDescription),
                }}
              >
                {chunk}
              </p>
            ),
          });
        });
      } else {
        blocks.push({
          id: `experience-${index}-spacer`,
          node: <div style={styles.itemWrapper} />,
        });
      }
    });
  }

  if (visibleSections?.education && filledEducation.length > 0) {
    filledEducation.forEach((edu, index) => {
      const descriptionChunks = splitTextIntoChunks(edu.description, 220);

      blocks.push({
        id: `education-${index}-header`,
        keepWithNext: descriptionChunks.length > 0,
        node: (
          <div style={styles.itemHeaderBlock}>
            {index === 0 && <h2 style={styles.sectionHeader}>Education</h2>}
            <div style={styles.itemHeader}>
              <div style={styles.titleWrapper}>
                <span style={styles.boldLabel}>{edu.degree }</span>
              </div>
              <div style={styles.dateWrapper}>
                <span style={styles.boldLabel}>{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
            <p style={{ ...styles.companySubHeader, fontStyle: "normal", fontWeight: 500 }}>
              {edu.school }
            </p>
          </div>
        ),
      });

      if (descriptionChunks.length > 0) {
        descriptionChunks.forEach((chunk, chunkIndex) => {
          const isLastChunk = chunkIndex === descriptionChunks.length - 1;
          blocks.push({
            id: `education-${index}-desc-${chunkIndex}`,
            node: (
              <p
                style={{
                  ...styles.descriptionText,
                  ...(isLastChunk ? styles.itemWrapper : styles.continuedDescription),
                }}
              >
                {chunk}
              </p>
            ),
          });
        });
      } else {
        blocks.push({
          id: `education-${index}-spacer`,
          node: <div style={styles.itemWrapper} />,
        });
      }
    });
  }

  if (visibleSections?.projects && filledProjects.length > 0) {
    filledProjects.forEach((proj, index) => {
      const descriptionChunks = splitTextIntoChunks(proj.desc, 220);

      blocks.push({
        id: `project-${index}-header`,
        keepWithNext: descriptionChunks.length > 0,
        node: (
          <div style={styles.itemHeaderBlock}>
            {index === 0 && <h2 style={styles.sectionHeader}>Projects</h2>}
            <div style={styles.itemHeader}>
              <div style={styles.titleWrapper}>
                <span style={{ ...styles.boldLabel, margin: 0 }}>
                  {proj.title }
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={styles.projectLink}>
                      (Link)
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        ),
      });

      if (descriptionChunks.length > 0) {
        descriptionChunks.forEach((chunk, chunkIndex) => {
          const isLastChunk = chunkIndex === descriptionChunks.length - 1;
          blocks.push({
            id: `project-${index}-desc-${chunkIndex}`,
            node: (
              <p
                style={{
                  ...styles.descriptionText,
                  ...(isLastChunk ? styles.itemWrapper : styles.continuedDescription),
                }}
              >
                {chunk}
              </p>
            ),
          });
        });
      } else {
        blocks.push({
          id: `project-${index}-spacer`,
          node: <div style={styles.itemWrapper} />,
        });
      }
    });
  }

  if (visibleSections?.certificates && certificates?.length > 0) {
    blocks.push({
      id: "certificates",
      node: (
        <section style={{ marginBottom: `${lh * 6}px` }}>
          <h2 style={styles.sectionHeader}>Certificates</h2>
          <p style={styles.descriptionText}>{certificates}</p>
        </section>
      ),
    });
  }

  if (visibleSections?.skills && filledSkills.length > 0) {
    filledSkills.forEach((skillGroup, index) => {
      blocks.push({
        id: `skill-${index}`,
        keepWithNext: false,
        node: (
          <>
            {index === 0 && <h2 style={styles.sectionHeader}>Skills</h2>}
            <p style={{ ...styles.descriptionText, marginBottom: "2px", marginTop: 0 }}>
              <span style={styles.boldLabel}>{skillGroup.category }: </span>
              {skillGroup.list}
            </p>
          </>
        ),
      });
    });
  }

  return (
    <PaginatedTemplate
      header={header}
      blocks={blocks}
      pageStyle={sheetContainer}
      firstPageContentStyle={{ flex: 1 }}
      nextPageContentStyle={{ flex: 1 }}
      renderFooter={(pageIndex) => (
        <div
          style={{
            position: "absolute",
            bottom: "5mm",
            right: "10mm",
            fontSize: "10px",
            color: "#999",
            fontWeight: "500",
          }}
        >
          Page {pageIndex + 1}
        </div>
      )}
    />
  );
}
