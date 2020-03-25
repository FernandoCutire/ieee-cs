const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");


const typeDefs = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");

mongoose.connect(
    process.env.DATABASE_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    }).then(() => {
        console.log("Base de datos conectada!!")
    }).catch(error => {
        console.log("Ha ocurrido un error", error)
    })

const server = new ApolloServer({ typeDefs, resolvers });


server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log(`Servidor listo en  ${url}`);
  });
