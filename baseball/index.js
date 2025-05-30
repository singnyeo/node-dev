const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

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

app.patch("/players/:id", async (req, res) => {
  const playerId = Number(req.params.id);
  const data = req.body;

  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: playerId },
      data,
    });
    res.json(updatedPlayer);
  } catch (error) {
    res.status(404).json({ error: "선수를 찾을 수 없습니다." });
  }
});

app.delete("/players/:id", async (req, res) => {
  const playerId = Number(req.params.id);

  try {
    await prisma.player.delete({
      where: { id: playerId },
    });
    res.json({ message: "선수가 정상적으로 삭제 되었습니다." });
  } catch (error) {
    res.status(404).json({ error: "선수를 찾을 수 없습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});