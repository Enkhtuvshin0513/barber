import { ApolloServer } from '@apollo/server';
import {
  Types as BarberTypes,
  Queries as BarberQueries,
  Mutations as BarberMutations,
} from './schema/barberShop';

import { barberShopQueries } from '../apollo/resolvers/queries/barberShop';

export const userApolloServer = new ApolloServer({
  typeDefs: `
    ${BarberTypes}
    input PageInput {
      page: Int
    }

    type PageInfo {
      page: Int
      totalCount: Int
    }

    type Query {
      ${BarberQueries}
    }
    
    type Mutation {
      ${BarberMutations}
    }
  `,

  resolvers: {
    Query: { ...barberShopQueries },

    Mutation: {},
  },
});
