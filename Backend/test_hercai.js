async function testHercai() {
  try {
    console.log("Testing Hercai API...");
    const url = "https://hercai.onrender.com/v3/text2image?prompt=coffee";
    const res = await fetch(url);
    const data = await res.json();
    console.log("Success:", data.url);
  } catch(e) {
    console.log("Hercai Error:", e.message);
  }
}
testHercai();
