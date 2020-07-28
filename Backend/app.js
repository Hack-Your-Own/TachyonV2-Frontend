require('dotenv').config();
const express = require('express');
const app = express();
const Student = require('./models/student')
const mongoose = require('mongoose');
const connectDb = () => {
    return mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
};
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


const user_schema = {
    1 : {name: "discord", type: "string", isArray: false},
    2 : {name: "firstname", type: "string", isArray: false},
    3 : {name: "region", type: "string", isArray: false}
    // "timestamp" : 0,
    // "email": 1,
    // "discord": 2,
    // "name": 3,
    // "region": 4,
    // "city": 5,
    // "pronouns": 1,
    // "status": 1,
    // "goals": 1,
    // "interest": 1,
    // "skills": 1,
    // "other_langs": 1,
    // "importance_spec_lang": 1,
    // "work_with_tech": 1,
    // "idea_pitch": 1,
    // "would_lead": 1,
    // "time_commitment": 1,
    // "commitment_level": 1,
    // "current_engagements": 1,
    // "short_essay": 1,
    // "ideal_finish_date": 1,
    // "in_five_years": 1,
    // "timezone": 1,
    // "college_year": 1,
    // "linkedin": 1,
    // "demographics": 1,
    // "preferences_tech": 1,
    // "preferences_team": 1,
    // "start_date": 1,
    // "drop_agreement": 1,
    // "rules_agreement": 1,
    // "tips": 1,
    // "questions": 1
}

app.get('/', function (req, res) {
  return res.send('Hello world');
});

app.get('/test', function (req, res) {
  Student.find({}, function (err, students) {
      if (err) return console.error(err);
      res.send(students);
  })
});

app.get('/sheets', function(req, res) {

  // Authorize a client with credentials, then call the Google Sheets API.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), getAllResponses);
  });

  // Get all data, including headers, from sheet
  function getAllResponses(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1s_YEDpl9fBMEhYTdMx9xA3CNzsYY1F68mzlCIzX1leU',
      range: 'Form Responses 7!$A$1:$YY',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);

      // allData is all the data in a multidimensional array!
      allData = res.data.values;

      let headers = [];
      let jsoon = {};

      // Read the first row of data and store all headers, will extract question numbers from these later
      for (let i = 0; i < allData[0].length; i++) {
          headers.push(allData[0][i]);
      }

      
      for (let r = 1; r < allData.length; r++) {
          for (let c = 2; c < 5; c++) {
              // Pick appropriate header that corresponds to each column
              // Split header into text and index, then parse index as int
              // This was we can use the index to search through the user_schema!
              let header = headers[c];
              let index = header.split(")")[0];
              index = parseInt(index);

              // Find the correct field name from the user_schema according to question number
              // Populate the "jsoon" that we will be using as a payload to push to Mongo!
              let field = user_schema[index].name;
              jsoon[field] = allData[r][c];
          }

          // This is where the call to Mongo will happen, 
          // right now it is a simple log so you can see how the code works
          console.log(jsoon);
      }

    });
  }
    
})


connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});


// app.listen(process.env.PORT || 8080);