- require PHP version 7.2.9
- tested on ApacheFriends XAMPP Version 7.2.9 with MariaDB version 10.1.35

**To successfully launch the program you need:**
- create a database and name it "easy_chat" (collation utf8mb4_unicode_ci);
- import 'easy_chat.sql' dump file which is located in the "sql" folder in 
  the root of the project into the "easy_chat" database;
- create a user for the newly created database. Use this command =>

GRANT ALL ON easy_chat. * TO 'lord_of_the_chat'@'localhost' IDENTIFIED BY 'some_password';

_You can use another server name, database name, user name and password, in this case make changes to 
the file 'db_config.php' which is located at the address 'app/config/db_config.php'._

**If you do not want to import database (or can't) you can use sql commands from 'sql_commands.sql'
file witch is located in the "sql" folder in the root of the project.**