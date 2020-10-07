// This is an example file for Node.js
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres();

// If you want to use the connection string instead for testing,
// you can try this:
//
// const sql = postgres('postgres://username:password@localhost:5432/database')

const books = await sql`
  SELECT * from books;
`;

console.log(books);

process.exit(0);
