const apiKey = "";
const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict`;

async function testGeminiImage() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        instances: [{ prompt: "A photorealistic cup of coffee on a table, advertising shot." }],
        parameters: { sampleCount: 1, aspectRatio: "1:1" }
      })
    });
    
    const data = await res.json();
    console.log(JSON.stringify(data).substring(0, 500));
    if (data.predictions) console.log("\nImage generation SUCCESS!");
    else console.log("\nFailed: predictions missing");
  } catch(e) {
    console.error("Error:", e);
  }
}
testGeminiImage();
