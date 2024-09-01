import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const port= 3000;
const app= express();
const db= new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "journal",
    password: "Sindhurana555.",
    port: 5432

});
const corsOptions = {
    origin: ["http://localhost:5173"],
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.json({ extended: true }));


db.connect();

app.get("/",async (req,res)=>{
    try {
        const journal_entries=await db.query("SELECT * FROM journal");
        res.json(journal_entries.rows);
        
    } catch (error) {
            console.log(error);
    }
})


app.patch("/update_journal/:id",async (req,res)=>{
    const { index, title, content, initial_date, update_date } = req.body;
    console.log(req.body);
    try {
        await db.query("UPDATE journal SET  content=($1), update_date=($2) where index=($3)",[content, update_date, index]);
    } catch (error) {
        console.log(error);
    }
})

app.post("/journal_entry",async (req,res)=>{
    const { index, title, content, initial_date, update_date } = req.body;

    try {
       const trial= await db.query("INSERT INTO journal (index, title, content, initial_date, update_date) VALUES ($1, $2, $3, $4, $5)",[index, title, content, initial_date, update_date]);
    } catch (error) {
        console.log(error)
    }
})


app.delete("/journal/:id", async (req,res)=>{
    const reqId= req.params.id;
    try {
        await db.query("DELETE FROM journal WHERE index=($1)",[reqId]);
        console.log("deleted");
    } catch (error) {
        console.log(error);
    }
})

app.listen(port,()=>{
    console.log("The server is running!");
})