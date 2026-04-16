import { ApolloServer } from '@apollo/server';
import {
  Types as BarberTypes,
  Queries as BarberQueries,
  Mutations as BarberMutations,
} from './schema/barberShop';

import { Mutations as OrderMutations } from './schema/order';

import { barberShopQueries } from '../apollo/resolvers/queries/barberShop';
import { orderMutations } from './resolvers/mutations/order';

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
      ${OrderMutations}
    }
  `,

  resolvers: {
    Query: { ...barberShopQueries },

    Mutation: { ...orderMutations },
  },
});
