const prompt = "Close-up, cinematic shot bathed in the golden warmth of late afternoon sun, casting long, soft shadows that sculpt the scene. The focal point is a stream of dark, viscous Ethiopian coffee, glistening as it gracefully pours from an ornate, traditional clay jebena into a small, elegant finjal";
const baseUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

async function testURL(model) {
  const url = `${baseUrl}?width=1024&height=1024&nologo=true&model=${model}`;
  const res = await fetch(url);
  console.log(model, res.status, res.headers.get("content-type"));
}

(async () => {
  await testURL("flux");
  await testURL("sana");
  await testURL("turbo");
})();
