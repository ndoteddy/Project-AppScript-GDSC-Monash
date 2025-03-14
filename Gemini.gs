// Function to generate content using the Gemini API
function askGeminiApiKey(inputText) {


  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=<yourApiKey>`;
  const data = {
    contents: {
      role: "USER",
      parts: [{ "text": inputText }]
    },
    generation_config: {
      temperature: 0.3,
      topP: 1,
      maxOutputTokens: 256
    }
  };

  const options = {
    method: "post",
    contentType: 'application/json',   
    payload: JSON.stringify(data)
  };

  return fetchDataFromGemini(url, options);
}




// Helper function to handle API response from Gemini
function fetchDataFromGemini(url, options) {
  try {
    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      const json = JSON.parse(response.getContentText());
      return json.candidates[0].content.parts[0].text;
    } else {
      Logger.log(`Error response: ${response.getContentText()}`);
      return "ERROR: API request failed";
    }
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return `ERROR: ${error.message}`;
  }
}


