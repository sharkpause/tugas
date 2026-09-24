const express = require('express');
const cors = require('cors');
const app = express();

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const typeDefs = require('./graphql/schema');
const jenisKelaminTypeDefs = require('./graphql/jenis_kelamin/schema');
const jenisKelaminResolvers = require('./graphql/jenis_kelamin/resolvers');
const angkatanTypeDefs = require('./graphql/angkatan/schema');
const angkatanResolvers = require('./graphql/angkatan/resolvers');
const mahasiswaTypeDefs = require('./graphql/mahasiswa/schema');
const mahasiswaResolvers = require('./graphql/mahasiswa/resolvers');
const programStudiTypeDefs = require('./graphql/program_studi/schema');
const programStudiResolvers = require('./graphql/program_studi/resolvers');

const resolvers = [
    jenisKelaminResolvers,
    angkatanResolvers,
    mahasiswaResolvers,
    programStudiResolvers
];

app.use(cors());
app.use(express.json());
console.log("Port dari .env:", process.env.PORT);

app.get("/", (req, res) => {
    res.json({
        message: "API Mahasiswa berjalan Dan Sukses",
        port: process.env.PORT
    });
});

const server = new ApolloServer({
    typeDefs: [typeDefs, jenisKelaminTypeDefs, angkatanTypeDefs, mahasiswaTypeDefs, programStudiTypeDefs],
    resolvers
});

async function startGraphQL() {
    await server.start();
    app.use(
        "/graphql",
        expressMiddleware(server)
    );
}

startGraphQL();
module.exports = app;