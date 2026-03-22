const { buildSchema } = require('graphql');

// GRAPHQL Schema Definition
// This allows the frontend to query exactly what it needs, preventing over-fetching
const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
    description: String
  }

  type Query {
    product(id: ID!): Product
    products(category: String): [Product]
  }
`);

// MOCK DATA for GraphQL mapping
const productsData = [
    { id: '1', name: 'Velvet Cleanser', price: 45.00, category: 'Cleansers', description: 'Gentle hydration.' },
    { id: '2', name: 'Radiance Serum', price: 85.00, category: 'Serums', description: 'Brightens skin.' },
];

const rootValue = {
    product: (args) => {
        const id = args.id;
        return productsData.find(product => product.id === id);
    },
    products: (args) => {
        if (args.category) {
            return productsData.filter(product => product.category === args.category);
        }
        return productsData;
    }
};

module.exports = { schema, rootValue };
