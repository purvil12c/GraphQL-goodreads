const fetch = require('node-fetch')
const util = require('util')
const utilpro = require('util.promisify')
const parseXML = utilpro(require('xml2js').parseString)

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql')
// fetch(
//   'https://www.goodreads.com/author/show.xml?id=4432&key=4SD7R5UNfnvM1buH72UTg'
// ).then(response => response.text())
// .then(body => parseXML(body))
// .then(result => console.log(result))
// .catch(error => console.log("error occured while fetch--- "+error))

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    name: { type: GraphQLString }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          console.log(args.id)
          fetch(
            `https://www.goodreads.com/author/show.xml?id=${args.id}&key=4SD7R5UNfnvM1buH72UTg`
          ).then(response => response.text())
          .then(body => parseXML(body))
          .then(result => console.log(result))
          .catch(error => console.log("error occured while fetch--- "+error))
        }
      }
    })
  })
})
