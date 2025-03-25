# Posts and Users UI (Angular)
A modern Angular 15 application for managing posts and users, now featuring **Angular Material** for an improved UI experience.

## 📌 Features
✅ **Post Management**: Create, list, and delete posts.  
✅ **User Management**: Register users, search users, and view profiles.  
✅ **User Availability Scheduling**: Schedule availability using **Angular Material Datepicker**.  
✅ **Enhanced UI with Angular Material**: Fully responsive design.  
✅ **Optimized Performance**: Using **Angular 15** features and improved state management.  
✅ **Backend Integration**: Connected to a Node.js + Express API.  

---

## 🚀 Technology Stack
- **Framework**: Angular 15
- **UI Components**: Angular Material
- **Backend**: Node.js + Express (REST API)
- **State Management**: RxJS Observables
- **Form Handling**: Reactive Forms (FormBuilder, Validators)
- **Routing**: Angular Router
- **Styling**: Material Design + SCSS

---

## 📂 Project Structure
```
src/
│── app/
│   ├── header/                  # App Header (Navigation)
│   ├── models/                  # Data Models (User, Post)
│   ├── modules/                 # Angular Modules (Material Module)
│   ├── new-post/                # Create a New Post
│   ├── new-user/                # Register a New User
│   ├── post-list/               # List of Posts
│   ├── post-list-item/          # Single Post Item
│   ├── services/                # Services (Post, User)
│   ├── user-availability-scheduler/  # Schedule User Availability
│   ├── user-list/               # List of Users
│   ├── user-list-item/          # Single User Item
│   ├── user-profile/            # User Profile
│   ├── user-search/             # User Search
│   ├── app.component.ts         # Root Component
│   ├── app.module.ts            # Angular Module
│── angular.json                 # Angular Configuration
│── package.json                 # Dependencies
│── README.md                    # Project Documentation
```

---

## ⚙️ Installation & Setup
### 1️⃣ Install Dependencies
Make sure you have **Node.js** installed, then run:
```sh
npm install
```

### 2️⃣ Run the Application
Start the development server:
```sh
npm start
```
The app will be available at: **http://localhost:4200/**

---

## 📜 Available Routes
| Path                          | Component                            | Description                |
| ----------------------------- | ------------------------------------ | -------------------------- |
| `/posts`                      | `PostListComponent`                  | View all posts             |
| `/new-post`                   | `NewPostComponent`                   | Create a new post          |
| `/users`                      | `UserListComponent`                  | View users list            |
| `/users/:id`                  | `UserProfileComponent`               | View user profile          |
| `/new-user`                   | `NewUserComponent`                   | Register a new user        |
| `/user-search`                | `UserSearchComponent`                | Search for users by email  |
| `/user-availability-schedule` | `UserAvailabilitySchedulerComponent` | Schedule user availability |

## 🤝 Contributing
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m 'feat: add new feature'`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a Pull Request 🚀  

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).