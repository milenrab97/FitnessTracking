const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'fitness_tracking_schema',
    connectionLimit: 5
})

pool.getConnection((err, connection) => {
    console.log('asd')
    if (err) {
        console.error(err)
    }
    if (connection) {
        console.log(connection)
        connection.release()
    }

    return
})

module.exports = pool