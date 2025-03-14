function analyzeWithGeminiOauth(rangeCell, promptCell, dataType) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get the values from the user-provided range
  const data = sheet.getRange(rangeCell).getValues();
  
  // Initialize a variable to hold the formatted data
  let formattedData = "";
  
  // Format the data based on the data type
  switch (dataType) {
    case 'courier':
      data.forEach(row => {
        formattedData += `Courier ${row[0]} visit date ${row[1]} Distance ${row[6]}\n`;
      });
      break;   
    default:
      throw new Error('Unknown data type');
  }
  
  // Combine the prompt with the formatted data
  const prompt = promptCell + '\n\n' + formattedData;
  
  // Call the Gemini API for insights
  const insights = askGeminiOAuth(prompt); 
  
  return insights;
}

function analyzeWithGeminiApiKey(rangeCell, promptCell, dataType) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get the values from the user-provided range
  const data = sheet.getRange(rangeCell).getValues();
  
  // Initialize a variable to hold the formatted data
  let formattedData = "";
  
  // Format the data based on the data type
  switch (dataType) {
    case 'courier':
      data.forEach(row => {
        formattedData += `Courier ${row[0]} visit date ${row[1]} Distance ${row[6]}\n`;
      });
      break;   
    default:
      throw new Error('Unknown data type');
  }
  
  // Combine the prompt with the formatted data
  const prompt = promptCell + '\n\n' + formattedData;
  
  // Call the Gemini API for insights
  const insights = askGeminiApiKey(prompt); 
  
  return insights;
}



function sendEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courier Schedule');
  const data = sheet.getDataRange().getValues();
  
  data.slice(1).forEach(row => { // Skip header row
    const courierName = row[0];
    const email = row[2];
    const description = row[3];
    const distance = row[6]; // Assuming distance is in column 5

    // Compose email
    const subject = `Reminder: ${courierName} - ${description}`;
    const body = `Hello,\n\nThis is a reminder for ${courierName} to deliver: ${description}.\nDistance: ${distance} km.\n\nBest regards,\nYour Team`;

    // Send email
    MailApp.sendEmail(email, subject, body);
  });
}

function createCalendarEvents() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courier Schedule');
  const calendarId =  "<<your calendar id>>";
  const calendar = CalendarApp.getCalendarById(calendarId);
  const data = sheet.getDataRange().getValues();

  const now = new Date();
  data.slice(1).forEach(row => { // Skip header row
    const courierName = row[0];
    const dateTime = new Date(row[1]); // Assuming the date and time are in column 2

    // Check if the event is in the future
    if (dateTime > now) {
      calendar.createEvent(courierName, dateTime, new Date(dateTime.getTime() + 60 * 60 * 1000), { description: row[3] });
    }
  });
}
function createDistanceReport() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courier Schedule');
  const data = sheet.getDataRange().getValues();
  
  // Convert to objects for easier sorting
  const reports = data.slice(1).map(row => ({
    name: row[0],
    email: row[1],
    description: row[2],
    latitude: row[3],
    longitude: row[4],
    distance: row[5]
  }));

  // Sort by distance
  reports.sort((a, b) => a.distance - b.distance);

  // Create Google Doc
  const doc = DocumentApp.create('Courier Distance Report');
  const body = doc.getBody();
  
  body.appendParagraph('Courier Distance Report').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  reports.forEach(report => {
    body.appendParagraph(`Courier Name: ${report.name}`);
    body.appendParagraph(`Email: ${report.email}`);
    body.appendParagraph(`Description: ${report.description}`);
    body.appendParagraph(`Distance: ${report.distance} km`);
    body.appendParagraph('--------------------------------');
  });

  doc.saveAndClose();
  
  // Send report to manager
  const managerEmail = "manager@example.com"; // Change to actual manager's email
  MailApp.sendEmail(managerEmail, 'Courier Distance Report', 'Please find the attached report.', { attachments: [doc.getAs(MimeType.PDF)] });
}




