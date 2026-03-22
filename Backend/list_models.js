import("node:https").then(https => {
  const options = {
    hostname: "generativelanguage.googleapis.com",
    path: "/v1beta/models?key=AIzaSyCFDXSx91O8p6liPIZdNWEh2Quf6aS1Z9E",
    method: "GET"
  };
  let body = "";
  const req = https.default.request(options, (res) => {
    res.on("data", d => body += d);
    res.on("end", () => {
      const data = JSON.parse(body);
      const supported = data.models
        .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
        .map(m => m.name);
      supported.forEach(s => console.log(s));
    });
  });
  req.end();
});
