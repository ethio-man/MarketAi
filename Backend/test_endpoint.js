async function testEndpoint() {
  const url = "https://pollinations.ai/p/coffee";
  console.log("Testing:", url);
  try {
    const res = await fetch(url);
    console.log("Status:", res.status, res.headers.get("content-type"));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
testEndpoint();
