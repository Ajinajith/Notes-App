var mysql = require("mysql2");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ajinwilbert",
  database: "notes_app_db",
  port:'3306',
  multipleStatements: true
});
module.exports = connection;