async function test() {
  const url1 = "https://image.pollinations.ai/prompt/coffee?model=flux";
  console.log("Testing:", url1);
  const r1 = await fetch(url1);
  console.log(url1, r1.status, r1.headers.get("content-type"));

  const url2 = "https://image.pollinations.ai/prompt/coffee";
  console.log("Testing:", url2);
  const r2 = await fetch(url2);
  console.log(url2, r2.status, r2.headers.get("content-type"));
}
test();
