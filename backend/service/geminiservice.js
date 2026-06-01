
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY1 ) {
  console.error("ERROR: GEMINI_API_KEY not found in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY1);

const analyzeResumeWithGemini = async (resumeText, jd) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an advanced ATS (Applicant Tracking System).

Analyze the resume against the job description.
Return the SAME result every time for the same resume and JD.

Resume:
${resumeText}

Job Description:
${jd}

Return STRICT JSON ONLY in the following format:

{
  "score": number,

  "skillsFound": string[],
  "missingSkills": string[],

  "suggestions": [
    {
      "title": string,
      "priority": "high" | "medium" | "low",
      "desc": string
    }
  ],

  "keywordMatchPercentage": number,

  "matchedKeywords": [
    {
      "keyword": string,
      "importance": "high" | "medium" | "low",
      "count": number
    }
  ],

  "missingKeywords": [
    {
      "keyword": string,
      "importance": "high" | "medium" | "low"
    }
  ],

  "keywordOptimizationTips": string[]
}

Rules:
- Score must be realistic (0–100)
- Keywords must come strictly from resume & job description
- Count = number of occurrences in resume
- Importance depends on how critical the keyword is in JD
- Suggestions & tips must be actionable
- Do NOT add explanations
- Do NOT add markdown
- Return ONLY valid JSON
`;



    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    if (!rawText) {
      throw new Error("No response from Gemini API");
    }

    // Remove ```json wrappers (if model included code fences) and trim
    const cleanJson = rawText.replace(/```json|```/g, "").trim();

    // Try to parse clean JSON. If parse fails, attempt to extract a JSON object substring.
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (err) {
      const match = cleanJson.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse Gemini response as JSON");
      }
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
};

module.exports = analyzeResumeWithGemini;