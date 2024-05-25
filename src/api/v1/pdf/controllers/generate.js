const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const { pdfTemplate } = require("./template");

    const generatePDF = async (req, res, next) => {

        pdf.create(pdfTemplate(req.body),{}).toFile("certificate.pdf", (err) => {
            if(err) {
                return Promise.reject(err);
            }
            const filePath = path.join(__dirname,'..', '..', '..', '..','..', 'certificate.pdf');
            res.sendFile(filePath, () => {
                // Delete the generated PDF file after sending
                fs.unlinkSync(filePath);
            });
        });

    };

module.exports = generatePDF;




