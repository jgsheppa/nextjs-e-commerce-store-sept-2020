const products = [
  {
    first_name: 'Kobo',
    last_name: 'Abe',
    title: 'Woman in the Dunes',
    product_image: '/kobo_abe.jpg',
    price: '$10.00',
    alt: 'Woman in the Dunes by Kobo Abe',
  },
  {
    first_name: 'Alan',
    last_name: 'Moore',
    title: 'Watchmen',
    product_image: '/watchmen.jpg',
    price: '$10.00',
    alt: 'Watchmen by Allen Moore',
  },
  {
    first_name: 'Franz',
    last_name: 'Kafka',
    title: 'Der Prozess',
    product_image: '/Kafka_Der_Prozess_1925.jpg',
    price: '$10.00',
    alt: 'Der Prozess by Franz Kafka',
  },
  {
    first_name: 'Dr.',
    last_name: 'Suess',
    title: 'The Sleep Book',
    product_image: '/sleepbook.jpg',
    price: '$10.00',
    alt: 'The Sleep Book by Dr. Seuss',
  },
];

exports.up = async (client) => {
  await sql`
    INSERT INTO users ${sql(
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

exports.down = async (client) => {
  for (const product in products) {
    await sql`
      DELETE FROM users WHERE
        first_name = ${product.first_name} AND
        last_name = ${product.last_name};
    `;
  }
};
