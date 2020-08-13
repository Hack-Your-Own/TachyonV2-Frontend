var fs=require('fs');
fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.SHEETS_KEY, (err) => {if (err) console.log("Write error: " + err)});