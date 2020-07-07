const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

let books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
  {name: 'The final empire', genre: 'Fantasy', id: '2'},
  {name: 'The Long Earth', genre: 'Sci-fi', id: '3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLString} },
      resolve(parent, args){
        //code to get data from db / other source
        return _.find(books, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})