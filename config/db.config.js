module.exports = {
    HOST    : "localhost",
    USER    : "root",
    PASSWORD: "root",
    DB      : "db_name",
    PORT    : "3306",
    dialect : "mysql",
    pool    : {
        /* Max & Min number of connection in Pool */
        max: 5,
        min: 0,
        /* Max time, in ms, that a connection can be idle before being released */
        acquire: 30000,
        /* Max time, in ms, that pool will try to get connection before throwing error */
        idle: 10000
    }
};