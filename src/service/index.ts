import { ProductTypes, ProductQuery, ProductMutation } from './product';
import { UserTypes, UserQuery, UserMutation } from './user';
import { CartTypes, CartQuery, CartMutation } from './cart';
import { SellTypes, SellQuery, SellMutation } from './sell';
import { gql } from 'apollo-server-express';


export const typeDefs = gql`
    type Query
    type Mutation
    ${ProductTypes}
    ${UserTypes}
    ${CartTypes}
    ${SellTypes}
`

export const resolvers = {
    Query: {
        ...ProductQuery,
        ...CartQuery,
        ...UserQuery,
        ...SellQuery,
    },
    Mutation: {
        ...ProductMutation,
        ...CartMutation,
        ...UserMutation,
        ...SellMutation,
    }
}