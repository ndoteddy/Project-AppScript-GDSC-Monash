function showDialog() {
  const html = HtmlService.createHtmlOutputFromFile('SelectionDialog')
      .setWidth(300)
      .setHeight(200);
  const checkboxes = getCheckBoxes(); // Get checkboxes
  html.append(`<script>const checkboxesHtml = '${checkboxes}';</script>`); // Pass to the HTML
  SpreadsheetApp.getUi().showModalDialog(html, 'Select Courier Schedule');
}


function addSelectedCouriersToCalendar(selectedRows) {
    //const calendar = CalendarApp.getDefaultCalendar();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courier Schedule');
  const calendarId = "<<your calendar id>>";
  const calendar = CalendarApp.getCalendarById(calendarId);
  const data = sheet.getDataRange().getValues();

  try {
    selectedRows.forEach(rowIndex => {
      const row = data[rowIndex];
      const courierName = row[0];
      const dateTime = new Date(row[1]);
      const description = row[2];

      calendar.createEvent(courierName, dateTime, new Date(dateTime.getTime() + 60 * 60 * 1000), { description: description });
    });

    Logger.log('Selected events added to Calendar');
    Browser.msgBox('Success', 'Selected events have been added to the calendar.', Browser.Buttons.OK);
  } catch (error) {
    Logger.log('Error occurred: ' + error.message);
    Browser.msgBox('Error', 'An error occurred while adding events to the calendar: ' + error.message, Browser.Buttons.OK);
  }
}



function getCheckBoxes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Courier Schedule');
  const data = sheet.getDataRange().getValues();
  let checkboxes = '';

  for (let i = 1; i < data.length; i++) { // Start from 1 to skip headers
    checkboxes += `<label><input type="checkbox" value="${i}"> ${data[i][0]} on ${data[i][1]}</label><br>`;
  }

  return checkboxes;
}
