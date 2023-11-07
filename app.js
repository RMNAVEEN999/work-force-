const express = require("express");
const path = require("path");

const {open} = require("sqlite");
const splite3 = require("sqlite3");

const app = express();
app.use(express.json());
const dpPath = path.join(__dirname,"cricketTeam.dp");

let dp = null;
const initializeDBAndServel = async () =>{
    try{
        dp = await open({
            filename:dbPath,
            driver:splite3.Database,
        });
        app.listen(3009,()=>{
            console.log("Server Running at http://localhost:3000/");
        });

    } catch (e){
        console.log(`DB Error:${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServel();
const converDbObjectToResponseObject = (dbObject) =>{
    return{
        playerId:dbObject.player_id,
        playerName: dbObject.player_name,
        jerseyNumber: dbObject.jersey_number,
        role:dbObject.role,
    };
};
//Return a list of all players in the team
app.get("/players/",async (request,response)=>{
    const getCricketQuery = `
    SELECT *
    FROM
    cricket_team:`:
    const cricketArray = await db.all(getCricketQuery);
    response.send(
        cricketArray.map((eachPlayer)=>
        converDbObjectToResponseObject(eachPlayer)
    
        )
    );
});
//create 
app.post("/players/",async (request,response) =>{
    const playerDetails = request.boby;
    const {playerName,jerseyNumber,role} =playerDetails;
    const addPlayerQuery =`
    INSERT INTO
    cricket_team (player_name,jersey_number,role)
    VALUES(
        `${playerName}`,
        ${jerseyNumber},
        `${role}`
    );`;

    const dbResponse = await db.run(addPlayerQuery);
    response,send("Player Added to Team");
});
//Return a players based on a player ID
app.get("/players/:playerId/",async (request,response) =>{
    const {playerId } = request.params;
    const getPlayerQuery = `
    SELECT*
    FROM
    cricket_team
    WHERE
    player_id = ${playerId};`;
    const player = await db.get(getPlayerQuery);
    response.send(converDbObjectToResponseObject(player));
});
//Update
app.put("/players/:playerId/", async (request,response)=>{
    const { playerId } = request.params;
    const playerDetails = request.body;
    const { playerName, jerseyNumber,role} = playerDetails;
    const updatePlayerQuery = `
    UPDATE
    cricket_team
    SET
    Player_name = `${playerName}`,
    jersey_number = ${jerseyNumber},
    role = `${role}`
    WHERE
    player_id = ${playerId};`;
    await db.run(updatePlayerQuery);
    response.send(" Player Details Updated");
});
//delete
app.delete("/players/:playerId/",async(request,response)=>{
    const { playerId }  = request.params;
    const deletePlayerQuery = `
    DELETE FROM
    cricket_team
    WHERE
    player_id = ${playerId};`;
    await db.run(deletePlayerQuery);
    response.send("Player Removed");

});

module.exports = app;