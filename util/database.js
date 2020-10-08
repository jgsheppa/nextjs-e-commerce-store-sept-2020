import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();

const sql = postgres();

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
