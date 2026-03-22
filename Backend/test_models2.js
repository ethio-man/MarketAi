const apiKey = "AIzaSyCFDXSx91O8p6liPIZdNWEh2Quf6aS1Z9E";
async function testModel(modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
  });
  console.log(modelName, res.status);
}
testModel("gemini-2.5-flash");
