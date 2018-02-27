const fetch = require('node-fetch')
const util = require('util')
const utilpro = require('util.promisify')
const parseXML = utilpro(require('xml2js').parseString)

const { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql')
// fetch(
//   'https://www.goodreads.com/author/show.xml?id=4432&key=4SD7R5UNfnvM1buH72UTg'
// ).then(response => response.text())
// .then(body => parseXML(body))
// .then(result => console.log(result))
// .catch(error => console.log("error occured while fetch--- "+error))

const BookType = new GraphQLObjectType({
  name: 'book',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: json => {
        return json.title[0]
      }

     },
    isbn: {
      type: GraphQLString,
      resolve: json => {
        return json.isbn[0]
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => {
        return json.GoodreadsResponse.author[0].name[0]
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: json => {
        //console.log("booklist")
        return json.GoodreadsResponse.author[0].books[0].book
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) =>
          fetch(
            `https://www.goodreads.com/author/show.xml?id=${args.id}&key=4SD7R5UNfnvM1buH72UTg`
          ).then(response => response.text())
          .then(parseXML)
      }
    })
  })
})
