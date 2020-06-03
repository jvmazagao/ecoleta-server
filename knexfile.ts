import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host: "localhost",
        user: "joaorodrigues",
        password: "",
        database: "databasename"
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}