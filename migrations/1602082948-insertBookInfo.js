const products = [
  {
    first_name: 'Kobo',
    last_name: 'Abe',
    title: 'Woman in the Dunes',
    product_image: '/kobo_abe.jpg',
    price: '10.00',
    alt: 'Woman in the Dunes by Kobo Abe',
  },
  {
    first_name: 'Alan',
    last_name: 'Moore',
    title: 'Watchmen',
    product_image: '/watchmen.jpg',
    price: '22.00',
    alt: 'Watchmen by Allen Moore',
  },
  {
    first_name: 'Franz',
    last_name: 'Kafka',
    title: 'Der Prozess',
    product_image: '/Kafka_Der_Prozess_1925.jpg',
    price: '7.00',
    alt: 'Der Prozess by Franz Kafka',
  },
  {
    first_name: 'Dr.',
    last_name: 'Seuss',
    title: 'The Sleep Book',
    product_image: '/sleepbook.jpg',
    price: '15.00',
    alt: 'The Sleep Book by Dr. Seuss',
  },
  {
    first_name: 'Gina',
    last_name: 'Franco',
    title: 'The Accidental',
    product_image: '/ginafranco.png',
    price: '19.00',
    alt: 'The Accidental by Gina Franco',
  },
  {
    first_name: 'Mary',
    last_name: 'Shelley',
    title: 'Frankenstein',
    product_image: '/frankenstein.jpg',
    price: '24.00',
    alt: 'Frankenstein by Mary Shelley',
  },
  {
    first_name: 'Fjodor',
    last_name: 'Dostojevskij',
    title: 'The Gambler',
    product_image: '/gambler.jpg',
    price: '15.00',
    alt: 'The Gambler by Fjodor Dostojevskij',
  },
  {
    first_name: 'Monica',
    last_name: 'Berlin',
    title: 'Nostalgia for a World Where We Can Live',
    product_image: '/monicaberlin.jpg',
    price: '19.00',
    alt: 'Nostalgia for a World Where We Can Live by Monica Berlin',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO books ${sql(
      products,
      'first_name',
      'last_name',
      'title',
      'product_image',
      'price',
      'alt',
    )}
  `;
};

exports.down = async (sql) => {
  for (const product in products) {
    await sql`
      DELETE FROM books WHERE
        first_name = ${product.first_name} AND
        last_name = ${product.last_name};
    `;
  }
};
