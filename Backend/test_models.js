const apiKey = "AIzaSyCFDXSx91O8p6liPIZdNWEh2Quf6aS1Z9E";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch(e) {
    console.error("Error:", e);
  }
}
listModels();
