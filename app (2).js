const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketTeam.db");
const app = express();
app.use(express.json());

let database = null;

const initialrizeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initialrizeDbAndServer();

const converDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  };
};

app.get("/players/", async (request, response) => {
  const getCricketQuery = `
    SELECT *
    FROM cricket_team;`;//remove here
  const cricketArray = await database.all(getCricketQuery);
  response.send(
    cricketArray.map((eachPlayer) => convertDbObjectToResponseObject(eachPlayer))
  );
  });
  

app.get("/players/:playerId/", async (request, response) => {
  const getCricketQuery = `
    SELECT *
    FROM cricket_team
    WHERE
        player_id = ${playerId};`;//remove here
  const cricketArray = await database.all(getCricketQuery);
  response.send(
    cricketArray.map((eachPlayer) => convertDbObjectToResponseObject(eachPlayer))
  );
});

app.post("/players/", async (request, response) => {
    const{playerName, jerseyNumber, role} = request.body;
    const addPlayerQuery = `
INSERT INTO
cricket_team (player_name, jersey_number, role)
VALUES
(
    '${playerName}',
    ${jerseyNumber},
    '${role}');`; //updated sql query
    const player = await database.run(addPlayerQuery);
    response.send("Player Added to Team");
    ....
});


app.put("/players/:playerId", async (request, response) =>{
    const{playerName,jerseyNumber,role} = request.body;
    const{playerId} = request.params
    const updatePlayerQuery = `
UPDATE
cricket_team
SET
player_name = '${playerName}',
jersey_number = ${jerseyNumber},
role = '${role}'
WHERE
player_id = ${playerId};`; //updated sql query
    await database.run(updatePlayerQuery);
    response.send("Player Details Updated")
});

app.delete("/players/:playerId", async (request, response) =>{
    const {playerId} = request.body;
    const deletePlayerQuery = `
DELETE FROM
    cricket_team
WHERE
    player_id = ${playerId};`; //updated sql query
 await database.run(deletePlayerQuery);   
 ....
});

module.exports = app;

