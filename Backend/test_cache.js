async function testCacheBust() {
  const prompt = "Toyota electric SUV parked cliffside, breathtaking sunset. Panoramic ocean, infinite possibilities. Forward motion.";
  const seed = Math.floor(Math.random() * 100000);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024&nologo=true&seed=${seed}`;
  
  console.log("Fetching:", url);
  try {
    const res = await fetch(url);
    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
testCacheBust();
