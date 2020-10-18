import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    const url = require('url');

    // Extract the connection information from the Heroku
    // environment variable
    const { hostname, pathname, auth } = url.parse(process.env.DATABASE_URL);

    const [username, password] = auth.split(':');

    process.env.PGHOST = hostname;
    process.env.PGDATABASE = pathname.slice(1);
    process.env.PGUSERNAME = username;
    process.env.PGPASSWORD = password;
  }
};

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
// export async function getUserById(id) {
//   // Return undefined if the id is not
//   // in the correct format
//   if (!/^\d+$/.test(id)) return undefined;

//   const users = await sql`
//     SELECT * FROM users WHERE id = ${id};
//   `;

//   const camelcaseUsers = users.map(camelcaseKeys);
//   return camelcaseUsers[0];
// }

// export async function updateUserById(id, user) {
//   // Return undefined if the id is not
//   // in the correct format
//   if (!/^\d+$/.test(id)) return undefined;

//   const users = await sql`
//     UPDATE users
//       SET first_name = ${user.firstName}
//       WHERE id = ${id}
//       RETURNING *;
//   `;

//   const camelcaseUsers = users.map(camelcaseKeys);
//   return camelcaseUsers[0];
// }
