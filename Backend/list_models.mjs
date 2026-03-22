// Test using v1 instead of v1beta, and different model names
const apiKey = "AIzaSyCFDXSx91O8p6liPIZdNWEh2Quf6aS1Z9E";
const models = [
  "v1/models/gemini-2.0-flash",
  "v1beta/models/gemini-2.0-flash",
  "v1beta/models/gemini-2.0-flash-exp",
  "v1beta/models/gemini-2.5-pro-exp-03-25",
];

async function testModel(path) {
  const url = `https://generativelanguage.googleapis.com/${path}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
  });
  console.log(`${path}: ${res.status}`);
}

(async () => {
  for (const m of models) await testModel(m);
})();
