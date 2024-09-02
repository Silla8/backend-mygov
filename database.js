const Pool= require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "silla",
    host: "localhost",
    port: 5432,
    database: "mygov"
});

module.exports= pool;