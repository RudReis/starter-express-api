const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.all("/pin", async (req, res) => {
  try {
    const link = req.query.link;
    const result = await api.downloader.pindl(link);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao fazer a chamada à API");
  }
});

async function pin(url) {
  const res = await axios(
    "https://www.expertsphp.com/facebook-video-downloader.php",
    {
      method: "POST",
      data: new URLSearchParams(Object.entries({ url })),
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      },
    }
  );
  const $ = cheerio.load(res.data);
  const response = {};
  response.status = res.status;
  response.creator = "";
  response.results = $("#showdata [src]")
    .map((_, element) => $(element).attr("src"))
    .get()
    .filter((link) => link.endsWith(".mp4"));
  return response;
}

app.listen(process.env.PORT || 3000)
