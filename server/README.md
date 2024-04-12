# Tech Stack
[![PYTHON](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![DJANGO](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/) 
[![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-14354C?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![SUPABASE](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)](https://supabase.com/)

The backend framework chosen for Vivid is Django, a high-level framework based on Python. In Django, we create database schemas and API endpoints to interact with the frontend, which is the client side of the application.

For data storage, Vivid uses a PostgreSQL database structure hosted and managed through Supabase. This choice allows for efficient data management and scalability.

The application follows a RESTful API architecture, which means that it uses HTTP methods such as POST, GET, PUT, and DELETE to perform CRUD operations. These operations enable the creation, retrieval, updating, and deletion of data, providing a robust foundation for managing information within the system.

To enhance user interaction and provide real-time communication capabilities, Vivid incorporates Django Channels. These channels facilitate the implementation of WebSockets, establishing persistent connections between the client and server. Unlike traditional HTTP requests that are stateless and require continuous polling for updates, WebSockets allow for seamless bidirectional communication. This technology is particularly useful for features like real-time chat, where immediate and continuous interaction is essential for a smooth user experience.

For more information, read below.

# File Tree Structure

Our backend consists of 5 different "django applications".
1. `classes_offered`
2. `finance_tracking`
3. `member_logs`
4. `message_platform`
5. `user_auth`

Each of these apps handle specific parts of our application.

For simplicity sake, these 5 apps will be noted as "membership_app" in the file structure below.
Every single django application we've created has most of these files. 

```plaintext
server/
├── membership_tracker/
│    └── __init__.py               # created after initializing django project
|    └── asgi.py                   # asynchronous server gateway interface (web server)
|    └── settings.py               # the overall settings of our django project (includes middleware and database)
|    └── urls.py                   # overall routes of our django project
|    └── wsgi.py                   # web server gateway interface (web server)
├── membership_app/                # django app handling classes offered section
|    └── migrations/               # migration changes depending on the django application
|          └── 0001_initial.py     # these depend on the number of migration changes in django
│    └── __init__.py               # created after initializing django app
|    └── admin.py                  # created after initializing django app
|    └── apps.py                   # created after initializing django app
|    └── consumers.py              # used only in 3. message_platform app, for websocket connections and handling
|    └── models.py                 # utilized to define objects for certain app requirements (logs, finances)
|    └── routing.py                # used only in 3. message_platform app, for websocket connection routing
|    └── seralizers.py             # used to convert database objects into readable python data types 
|    └── tests.py                  # used for testing certain API routes or websocket handles
|    └── urls.py                   # used to define certain API routes for certain django applications
|    └── views.py                  # used to define the functionality of the API routes (HTTP request handling)
└── .env                           # environment variables and config settings for database
└── .env.example                   # environment variable example file
└── .gitignore                     # ignore python files
└── README.md                      # this README file
└── manage.py                      # the main application entry point
└── requirements.txt               # the dependencies associated with our application
```

# Data Models

## User
| Field         | Type        | Description                              |
|---------------|-------------|------------------------------------------|
| ID            | int8        | The primary key (auto-incremented).      |
| first_name    | varchar     | First name of user.                      |
| last_name     | varchar     | Last name of user.                       |
| is_active     | bool        | User activity (on the application).      |
| date_joined   | timestamptz | When the user joined the application.    |
| email         | varchar     | Unique email address for the user.       |
| password      | varchar     | Hashed password for the user's account.  |
| role          | varchar     | Role of the user.                        |
| date_of_birth | date        | The date of birth of the user.           |

## Member Logs
| Field                | Type     | Description                                |
|----------------------|----------|--------------------------------------------|
| ID                   | int8     | The primary key (auto-incremented).        |
| payment_status       | varchar  | Payment status of the member.              |
| membership_approved  | bool     | If the member is approved.                 |
| attendance_count     | int4     | How many classes the member has went to.   |
| user_id              | int8     | The Member ID that relates to User model.  |
| prepaid_fees         | int4     | How many fees the member has already paid. |

## Coach Tracking
| Field                   | Type     | Description                                |
|-------------------------|----------|--------------------------------------------|
| ID                      | int8     | The primary key (auto-incremented).        |
| payment_balance         | int4     | Payment status of the member.              |
| numbers_classes_taught  | int4     | If the member is approved.                 |
| user_id                 | int8     | The Coach ID that relates to User model.   |
| last_payment_balance    | int4     | The salary from last month.                |

## Classes Offered
| Field            | Type         | Description                                |
|------------------|--------------|--------------------------------------------|
| ID               | int8         | The primary key (auto-incremented).        |
| class_title      | varchar      | The title of the class.                    |
| instructor_name  | varchar      | The coach full name.                       |
| class_datetime   | timestamptz  | When the class is held.                    |
| participants     | varchar[]    | The members in the class.                  |

## Rooms
| Field            | Type         | Description                                |
|------------------|--------------|--------------------------------------------|
| ID               | int8         | The primary key (auto-incremented).        |
| room_name        | varchar      | The room name for chatting.                |

## Room Users
| Field      | Type  | Description                         |
|------------|-------|-------------------------------------|
| ID         | int8  | The primary key (auto-incremented). |
| room_name  | int8  | The room name for chatting.         |
| user_id    | int8  | The User ID in the room ID.         |

## Messages
| Field          | Type        | Description                         |
|----------------|-------------|-------------------------------------|
| ID             | int8        | The primary key (auto-incremented). |
| room_name      | int8        | The room name for chatting.         |
| user_id        | int8        | The User ID in the room ID.         |
| content        | text        | The content/message description.    |
| class_datetime | timestamptz | The time stamp of the message.      |
| title          | text        | The content/message title.          |

# Test Users
| First Name | Last Name | Email               | Password | Date of Birth |
|------------|-----------|---------------------|----------|---------------|
| John       | Couch     | member@gmail.com    | testing  | 2010-12-17    |
| Peter      | Couch     | coach@gmail.com     | testing  | 1995-02-15    |
| Mary       | Couch     | treasurer@gmail.com | testing  | 1998-01-05    |

# API Routes
| HTTP Method | Endpoint                                 | Description                                | Required JSON Body                                   | Middleware |
|-------------|------------------------------------------|--------------------------------------------|------------------------------------------------------|------------|
| GET         | `user-auth/user/`                        | Get user information.                      | None                                                 | JWT needed |
| POST        | `user-auth/login/`                       | Login to user account.                     | {"email": "member@gmail.com", "password": "testing"} | JWT needed |
| POST        | `user-auth/logout/`                      | Logout of user account.                    | None                                                 | JWT needed |
| POST        | `user-auth/register/`                    | Register a new user in the database.       | {"first_name": "Test", "last_name": "test", "email": "your@gmail.com", "date_of_birth": "2001-01-01", "password": "testing", "role": "member"} | None |
| PUT         | `user-auth/reset/`                       | Reset password and create a new password.  | {"email": "member@gmail.com", "password": "new", "confirmPassword": "new"} | None |
| POST        | `chat-channels/rooms/`                   | Creates a new room.                        | {"room_name": "some_room"} | None |
| GET         | `chat-channels/rooms/<str:room_name>/`   | Gets the message history of a room.        | None | JWT needed |
| PUT         | `member-logs/profile/password/`          | Allows the user to change password.        | {"old_password": "testing", "new_password": "new"} | JWT needed |
| PUT         | `member-logs/profile/email/`             | Allows the user to change the email.       | {"new_email": "new@gmail.com"} | JWT needed |
| GET         | `member-logs/members/`                   | Gets the members as an admin.              | None | JWT needed |
| PUT         | `member-logs/approve/`                   | Approves the member.                       | {"id": 1, "membership_approved": true} | JWT needed |
| DELETE      | `member-logs/reject/`                    | Removes the member.                        | {"id": 1} | JWT needed |
| PUT         | `member-logs/reset/`                     | Treasurer resets password of member.       | {"id": 1} | JWT needed |
| PUT         | `member-logs/activity/`                  | Treasurer deactivates/activates account.   | {"id": 1} | JWT needed |
| GET         | `member-logs/approval/`                  | Checks if the member is approved.          | None | JWT needed |
| GET         | `finance-tracking/showallcoaches/`       | Gets the coach salaries.                   | None | JWT needed |
| PUT         | `finance-tracking/resetbalance/`         | Resets the balance of the coach.           | {"id": ID} | JWT needed |
| PUT         | `finance-tracking/countclassesteaching/` | Count the classes teaching.                | {"id": ID} | JWT needed |
| GET         | `finance-tracking/showlastpayment/`      | Get the last monthly payment as a coach.   | None | JWT needed |
| POST        | `classes-offered/createclass/`           | Creates a new class.                       | {"class_title": "class", "instructor_name": "Tanke Quiroga", "class_datetime": "2025-02-15"} | JWT needed |
| PUT         | `classes-offered/joinclass/`             | Joins a class.                             | {"class_title": "class"} | JWT needed |
| DELETE      | `classes-offered/deleteclass/`           | Deletes a class.                           | {"class_title": "class"} | JWT needed |
| GET         | `classes-offered/showuserclasses/`       | Gets all classes a user is enrolled in.    | None | JWT needed |
| GET         | `classes-offered/showcoachclasses/`      | Shows all classes a coach is teaching.     | None | JWT needed |
| GET         | `classes-offered/showavailableclasses/`  | Shows all available classes to enroll.     | None | JWT needed |
| GET         | `classes-offered/showmembersinclasses/`  | Shows all members in a specific class.     | {"class_title": "class"} | JWT needed |

## Notes
- Middleware descriptions: a valid JWT token is needed for any user. 
- Ensure to replace placeholder values like `member@gmail.com`, `testing`, etc., with actual information when making requests.