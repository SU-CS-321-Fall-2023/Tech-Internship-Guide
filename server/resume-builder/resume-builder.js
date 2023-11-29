const fs = require("fs-extra");
const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");

const generateFromTemplate = (data, templatePath) => {
  const templateContent = fs.readFileSync(templatePath, "binary");

  // Load the template content
  const zip = new PizZip(templateContent);
  const doc = new Docxtemplater(zip);

  // Assign data to the template
  doc.setData(data);

  // Perform the document substitution
  doc.render();

  // Get the generated Word document content
  const generatedContent = doc.getZip().generate({ type: "nodebuffer" });
  return generatedContent;
};

const create = (data) => {
  console.log(data);
  const templatePath = `${__dirname}/template-1.docx`;
  return generateFromTemplate(data, templatePath);
};

const ResumeBuilder = {
  create,
  generateFromTemplate,
};

module.exports = ResumeBuilder;
