// Kadjot Fitness Backend Configuration Template
// Copy this file to config.js and update with your credentials

module.exports = {
    database: {
        host: 'localhost',
        user: 'YOUR_MYSQL_USERNAME',      // Change this to your MySQL username
        password: 'YOUR_MYSQL_PASSWORD',  // Change this to your MySQL password
        database: 'kadjot_fitness',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    
    server: {
        port: 3000,
        env: 'development'
    },
    
    session: {
        secret: 'CHANGE-THIS-TO-A-RANDOM-SECRET-STRING',  // Change this!
    },
    
    cors: {
        origin: 'http://localhost:8080',
        credentials: true
    }
};
