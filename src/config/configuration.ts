export default () => ({
    server: {
        port: parseInt(process.env.SERVER_PORT!, 10)
    },
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    }
})