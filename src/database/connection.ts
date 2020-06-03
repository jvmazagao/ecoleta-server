import knex from 'knex';
import path from 'path'

const connection = knex({
    client: 'pg',
    connection: {
        host: "localhost",
        user: "joaorodrigues",
        password: "",
        database: "databasename"
      },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000
});


export default connection;