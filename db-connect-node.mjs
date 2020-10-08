// This is an example file for Node.js
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres();



const books = await sql`
  SELECT * from books;
`;

console.log(books);

process.exit(0);
