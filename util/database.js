// import postgres from 'postgres';
// import dotenv from 'dotenv';
// // import camelcaseKeys from 'camelcase-keys';

// dotenv.config();

// const sql = postgres();

export const products = [
  {
    id: '1',
    firstName: 'Kobo',
    lastName: 'Abe',
    title: 'Woman in the Dunes',
    productImage: '/kobo_abe.jpg',
    price: '$10.00',
    alt: 'Woman in the Dunes by Kobo Abe',
  },
  {
    id: '2',
    firstName: 'Alan',
    lastName: 'Moore',
    title: 'Watchmen',
    productImage: '/watchmen.jpg',
    price: '$10.00',
    alt: 'Watchmen by Allen Moore',
  },
  {
    id: '3',
    firstName: 'Franz',
    lastName: 'Kafka',
    title: 'Der Prozess',
    productImage: '/Kafka_Der_Prozess_1925.jpg',
    price: '$10.00',
    alt: 'Der Prozess by Franz Kafka',
  },
  {
    id: '4',
    firstName: 'Dr.',
    lastName: 'Suess',
    title: 'The Sleep Book',
    productImage: '/sleepbook.jpg',
    price: '$10.00',
    alt: 'The Sleep Book by Dr. Seuss',
  },
];

// export async function getUsers() {
//   const users = await sql`
//     SELECT * FROM users;
//   `;
//   return users.map(camelcaseKeys);
// This is what it looks like without a library:
// return users.map((user) => {
//   return {
//     id: user.id,
//     firstName: user.first_name,
//     lastName: user.last_name,
//   };
// });
// }

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
