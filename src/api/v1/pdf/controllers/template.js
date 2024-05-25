const { parseISO, format } = require('date-fns');

const pdfTemplate = (data) => {
    let vaccinesHTML = ''; // Initialize an empty string to hold the HTML for vaccines

    // Iterate over each vaccine in the data
    data.vaccines.forEach((vaccine, _index) => {
        const dateString = vaccine.updatedAt;
        const date = parseISO(dateString);

const formattedDate = format(date, 'dd-MM-yyyy');
        // Append HTML for each vaccine to the vaccinesHTML string
        vaccinesHTML += `
            <div class="vaccine">
                <p><strong>Vaccination Id</strong> ${vaccine._id}</p>
                <p><strong>Vaccine Name:</strong> ${vaccine.name}</p>
                <p><strong>Appointment Id:</strong> ${vaccine.appointment}</p>
                <p><strong>Appointment Date:</strong> ${formattedDate}</p>
                <p><strong>Vaccine Center Name:</strong> SafeShot Vaccination</p>
                <p><strong>Vaccine Center Address:</strong> SafeShot Vaccination. Downhill street 7534.</p>
            </div>
        `;
    });

    // Return the complete HTML template with the vaccinesHTML included
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vaccine Completion Certificate</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h1 {
                    color: #333;
                }
                .vaccine {
                    margin-bottom: 20px;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 10px;
                }
                .vaccine h2 {
                    color: #333;
                    margin-bottom: 10px;
                }
                .vaccine p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Vaccine Completion Certificate</h1>
                    <p><strong>User Name:</strong> ${data.name}</p>
                    <p><strong>User Email:</strong> ${data.email}</p>
                </div>
                ${vaccinesHTML}
            </div>
        </body>
        </html>`;
};

module.exports = { pdfTemplate };
