import app from './app';
import Database from './utils/db';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(__dirname, '../.env')})
const data = new Database();
app.listen(Number(process.env.PORT || 4000), '0.0.0.0', 
() => {
  console.log(`Express started.\nListening on port 4000`);
});
