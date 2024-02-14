const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.get("/insta2", async (req, res) => {
  try {
    const link = req.query.link;
    const result = await fetch("https://instasaver.butterhub.online/api", {
      method: "POST",
      body: JSON.stringify({ link: req.query.link }),
    });
    const data = await result.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao fazer a chamada à API");
  }
});

app.listen(process.env.PORT || 3000)
