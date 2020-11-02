import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `

   enum Gender {
      MALE
      FEMALE
      OTHER
   }

   type Contact {
      firstName: String
      lastName: String
   }

   type Friend {
      id: ID
      firstName: String
      lastName: String
      gender: Gender
      language: String
      email: String
      age: Int
      contacts: [Contact]
   }

   type Alien {
      id: ID
      firstName: String
      lastName: String
      planet: String
   }

   type Query {
      getFriend(id: ID): Friend
   }

   input FriendInput {
      id: ID
      firstName: String!
      lastName: String
      gender: Gender
      language: String
      email: String
      age: Int
      contacts: [ContactInput]
   }

   input ContactInput {
      firstName: String
      lastName: String
   }

   type Mutation {
      createFriend(input: FriendInput): Friend
   }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
