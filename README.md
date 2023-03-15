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

### Welcome Page:
![React-welcomePage](https://user-images.githubusercontent.com/76518461/225254379-f8bfce87-e1e4-4570-a364-5230f2318589.png)

### Login Page:
![react-LoginPage](https://user-images.githubusercontent.com/76518461/225254777-815603af-f705-4394-b606-6f4098007418.png)

### List of Produscts:
![react-list](https://user-images.githubusercontent.com/76518461/225254969-651e431e-05d8-4338-85d6-a170837ea916.png)

### List of Documents:
![react-Document_list](https://user-images.githubusercontent.com/76518461/225255082-1a281404-c653-4048-a20f-19a959746a03.png)

### Preview Document Page:
![react-PZ](https://user-images.githubusercontent.com/76518461/225255309-5acd117d-c36c-4aaa-b06c-427af42f7652.png)

### Adding New Product:
![newItem](https://user-images.githubusercontent.com/76518461/225255547-599c049b-4c15-4c24-9e3e-bd6c3060bad4.png)

### Adding products to new document:
![add-items](https://user-images.githubusercontent.com/76518461/225255671-16fc44c9-d454-454c-b38f-6e2698b14c88.png)




