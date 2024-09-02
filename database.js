const Pool= require("pg").Pool;
const pool = new Pool({
    user: "mygov_user",
    password: "cSuuFm22zTit1PxQLj5DD8C4H1lY3nWG",
    host: "dpg-crb3efjtq21c73cf8adg-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "mygov"
});

module.exports= pool;