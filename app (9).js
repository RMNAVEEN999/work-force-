const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "todoApplication.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
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

initializeDbAndServer();

const hasPriorityAndStatusProperties = (requestQuery) => {
  return (
    requestQuery.priority !== undefined && requestQuery.status !== undefined
  );
};

const hasPriorityPriority = (requestQuery) =>{
    return(
        requestQuery.priority !== undefined;
    );
};

const hasStatusPriority = (requestQuery) =>{
    return(
        requestQuery.status !== undefined;
    );
};


app.get("/todos/",async(request,repsonse) =>{
    let data = null;

    let getTodoQuery = "";

    const{ search_q = "", priority, status }  = request.query;

    switch (true) {
        case hasPriorityAndStatusProperties(request.query):
            getTodoQuery =`

                SELECT
                *
                
                FROM

                todo

                WHERE

                todo LIKE '%${search_q}%'
                AND status = '${status}'
                AND priority = '${priority}';`;
            
            break;
        case hasPriorityPriority(request.query):
            getTodoQuery =`

                SELECT
                *
                
                FROM

                todo

                WHERE

                todo LIKE '%${search_q}%'
            
                AND priority = '${priority}';`;
            
            break;
        case hasStatusPriority(request.query):
            getTodoQuery =`

                SELECT
                *
                
                FROM

                todo

                WHERE

                todo LIKE '%${search_q}%'
            
                AND status = '${status}';`;
            
            break;    

    
        default:
            getTodoQuery =`

                SELECT
                *
                
                FROM

                todo

                WHERE

                todo LIKE '%${search_q}%';`;
            break;
    }
     data = await database.all(getTodoQuery);

     repsonse.send(data)
});

app.get("/todos/:todoId/", async(request,repsonse) =>{
    const { todoId } = request.params;

    const getTodoQuery =`

                SELECT
                *
                
                FROM

                todo

                WHERE

                id = ${todoId}';`;
    const todo = await database.get(getTodoQuery);
    repsonse.send(todo);            
});

app.post("/todos/", async (request, response) => {
    const { id, todo, priority, status } = request.body; //Destructuring variables from the request body
    const insertTodo = `
            INSERT INTO todo (id, todo, priority, status)
            VALUES (${id},'${todo}','${priority}','${status}');`; //Updated the values with the variables
    await database.run(insertTodo);
    response.send("Todo Successfully Added");
});


app.put("/todos/:todoId/", async(request,response) =>{
    const { todoId } = request.params;

    const updateColumn = "";
    
    const requestBody = request.body;
    switch (true) {
        case requestBody.status !== undefined:
            updateColumn = "Status";
            
            break;
        case requestBody.priority !== undefined:
            updateColumn = "Priority";
            break;
        case requestBody.todo !== undefined:
            updateColumn = "Todo";
            
            break;
    }
    const previousTodoQuery = `
                SELECT
                *
                
                FROM

                todo

                WHERE

                id = ${todoId}';`;
    const previousTodo = await database.get(previousTodoQuery);
    
    const {
        todo = previousTodo.todo,
        status = previousTodo.status,
        priority = previousTodo.priority,
    } = request.body;
    
    const updateTodoQuery = `
            UPDATE

            todo

            SET
            todo = '${todo}',
            priority = '${priority}',
            status = '${status}'

            WHERE
            id = ${todoId}';`;
    await database.run(updateTodoQuery);
    response.send(`${updateColumn} Updated` );
    
    
    
    
});

app.delete("/todos/:todoId/", async(request,repsonse) =>{
    const { todoId } = request.params;

    const DeleteTodoQuery =`

                DELETE FROM
                
                
                FROM

                todo

                WHERE

                id = ${todoId}';`;
    const database = await database.get(DeleteTodoQuery);
    repsonse.send("Todo Deleted");            

});

module.exports = app;