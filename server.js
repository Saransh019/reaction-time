const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submitData', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);

    // Save data to CSV file
    saveToCSV(receivedData);

    // Send response back to client
    res.sendStatus(200);
});

// Function to save data to CSV file
function saveToCSV(data) {
    // const csvData = `${data.name},${data.age},${data.email}\n`;
    const csvData = `${data.name || 'assa'},${data.gender || 'M'},${data.reactionTime || ''}\n`;


    fs.appendFile('data.csv', csvData, (err) => {
        if (err) {
            console.error('Error writing to CSV file:', err);
            return;
        }
        console.log('Data has been saved to data.csv');
    });
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
