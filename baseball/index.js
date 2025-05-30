const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("node-dev/baseball API");
});

app.get("/players", async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

app.post("/players", async (req, res) => {
    const { name, position, team } = req.body;
    const newPlayer = await prisma.player.create({
      data: { name, position, team },
    });
    res.status(201).json(newPlayer);
  });

app.listen(PORT, () => {
  console.log(`Sever running on http://localhost:${PORT}`);
});
