const resumedata = require("../model/Atsmodel");
const pdfParse = require("pdf-parse-debugging-disabled");
const analyzeResumeWithGemini = require("../service/geminiservice")
const fs = require("fs");

const uploadresume = async (req, res) => {
  try {
    const useremail = req.body.useremail;
    const pdfadd = req.file.filename;
    const count = req.body.counter;
    const jd = req.body.jd;


    // Save to DB
    const data = new resumedata({ useremail, pdfadd, count });
    await data.save();

     if (!jd || !jd.trim()) {
      return res.status(400).json({ message: "Job description is required" });
    }

    // Read PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // ✅ Parse PDF (THIS WILL WORK)
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ message: "Empty resume text" });
    }
      const analysis = await analyzeResumeWithGemini(
        resumeText,
        jd
      );

  if(analysis){
        res.json({
      statuscode: 1,
      message: "Resume parsed successfully",
      analysis
    });
  }else{
    res.send({
      statuscode:0
    })
  }
 

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      statuscode: 0,
      message: "Error processing resume",
      error: err.message
    });
  }
};

module.exports = { uploadresume };