const upportfolio = require("../model/Portfoliodata");

const updateportfolio = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      slug,
      template,
      navbar,
      hero,
      bgImages,
      about,
      stats,
      techStack,
      journey,
      projects,
      contact,
      email
    } = req.body;

    const updatedData = {
      Email: email,
      slug,
      template,
      navbar,
      hero,
      bgImages,
      about,
      stats,
      techStack,
      journey,
      projects,
      contact,
      datee: new Date()
    };

    const result = await upportfolio.findOneAndUpdate(
      { _id: id },
      updatedData,
      { returnDocument: "after" } // ✅ fixed
    );

    if (!result) {
      return res.send({
        statuscode: 0,
        message: "Portfolio didn't update"
      });
    }

    return res.send({
      statuscode: 1,
      message: "Portfolio updated successfully"
    });

  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).send({
      statusCode: 0,
      message: "Server error"
    });
  }
};

module.exports = { updateportfolio };