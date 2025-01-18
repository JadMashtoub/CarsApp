const dbConfig = {
    user: process.env.DB_USER || 'fallback_user',
    password: process.env.DB_PASSWORD || 'fallback_password',
    server: process.env.DB_SERVER || 'fallback_server', 
    database: process.env.DB_DATABASE || 'fallback_database',
   
   
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
    port: parseInt(process.env.DB_PORT, 10) || 1433,
  };
  
  module.exports = dbConfig;

