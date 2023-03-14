const queries = require("../../crudOperations/Themes/theme.js");

const addThemes = async (req, res) => {
  try {
    const themeQuery =
      `INSERT INTO account_themes (themeId, darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr) VALUES` +
      `(1, '#7D1538', '#FFFFFF', '#D3F3EE', '#000000', '#902214', '#FFFFFF'),` +
      `(2, '#407899', '#FFFFFF', '#FFFFF2', '#000000', '#41D3BD', '#000000'),` +
      `(3, '#BDC4A7', '#000000', '#F3F9D2', '#000000', '#92B4A7', '#000000'),` +
      `(4, '#274C77', '#FFFFFF', '#A3CEF1', '#000000', '#6096BA', '#FFFFFF'),` +
      `(5, '#335C67', '#FFFFFF', '#FFF3B0', '#000000', '#E09F3E', '#000000'),` +
      `(6, '#A30000', '#FFFFFF', '#FFBA08', '#000000', '#136F63', '#FFFFFF'),` +
      `(7, '#C4B7CB', '#000000', '#BFEDEF', '#000000', '#BBC7CE', '#000000'),` +
      `(8, '#0F0326', '#FFFFFF', '#F5F7DC', '#000000', '#E65F5C', '#FFFFFF'),` +
      `(9, '#BB0A21', '#FFFFFF', '#FFF9FB', '#000000', '#4B88A2', '#FFFFFF');`;
    await queries.addThemes(themeQuery);

    return res.status(200).json("Themes Added Successfully");
  } catch (error) {
      console.log(error);
    return res.status(500).json(error);
  }
};
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
