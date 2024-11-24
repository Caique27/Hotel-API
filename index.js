import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/', async(req, res) => {
  try{
    const data = await connectToDatabase(req.body.query)
    res.json(data);

  }catch(ex){
    res.status(500).json({message:'error'}) }
  
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});



const client = new Pool({
  connectionString: process.env.CONNECTION_STRING });

async function connectToDatabase(query) {
  try{const res = await client.query(query);
    return(res.rows)}catch(ex){
      console.log(ex)
    }
     
}

// Call the async function