import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

export async function getBooks() {
  const books = await sql`
    SELECT * FROM books;
  `;
  return books.map(camelcaseKeys);
}

export async function getBookById(id) {
  const books = await sql`
    SELECT * FROM books WHERE id = ${id};
  `;

  return books.map(camelcaseKeys);
}
