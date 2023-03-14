const queries = require("../../crudOperations/Themes/theme.js");

const addThemes = async (req, res) => {
  try {
    const { darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr } = req.body;
    const array = [darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr]
    await queries.addThemes(array);

    return res.status(200).json("Themes Added Successfully");
  } catch (error) {
      console.log(error);
    return res.status(500).json(error);
  }
};
addThemes
const getThemes = async (req, res) => {
  try {
    const data = await queries.getThemes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addThemes,
  getThemes,
};
