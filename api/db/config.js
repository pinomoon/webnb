exports.config = {
    connectionLimit: 10,
    host: 'localhost',
    // Non usiamo *** mai *** root senza password
    user: 'lucalb98',
    password: 'lucalb98',
    database: 'webnb',
    multipleStatements: true // consente query multiple in un'unica istruzione SQL
}