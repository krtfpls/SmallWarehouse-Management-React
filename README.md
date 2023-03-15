# Warehouse management / React

Small application for simple warehouse management for my own development.
It's my first project, so please bear with it.
Change appsettings_scheme.json to appsettings.json and fill.

### example:

  "ConnectionStrings": {
  "SQLiteConnection": "Data source=magazyn.db",
  "PostgresConnection": "Server=x.x.x.x; Port=5432; User Id=magazyn; Password=Password; Database=magazyn"
},

  "TokenKey": "Your Own Token Key",
  
  "EmailConfiguration": {
    "From": "Your_Log_email@notification.com",
    "SmtpServer": "smtp.notification.com",
    "Port": 465,
    "Username": "Your_Name@notification.com",
    "Password": "Your_Email_Notification_Password"
  }
}


## Technologies:
* API: C# with .Net 5.0
  * EntityFramework
  * CQRS Pattern
  * SQLite on Dev and Postrgres on production
* FrontEnd React ver. 17 
  * with Typescript


