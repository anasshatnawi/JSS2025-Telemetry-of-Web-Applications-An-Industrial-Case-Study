# 🚀 Posts & Users Backend
A **Node.js + Express + TypeScript** RESTful API for a social media that provides users and posts management.

## 📌 Features
- ✅ **User Management:** Create, read, update, delete (CRUD) operations for users  
- ✅ **Post Management:** Full CRUD operations with like/dislike functionality  
- ✅ **In-Memory Data Storage:** Fast prototyping with in-memory data sources  
- ✅ **RESTful API:** Clean, well-structured routes for easy integration  
- ✅ **Modular Architecture:** Organized controllers, services, repositories, and models  
- ✅ **Environment Configuration:** Using `.env` for flexible environment settings  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express  
- **Language:** TypeScript  
- **Data Handling:** In-memory data storage  
- **Environment:** dotenv  
- **Build Tools:** ts-node, nodemon  

---

## 🗂️ Project Structure
```
src/
├── controllers/               # Route handlers for users and posts
│   ├── post.controller.ts
│   └── user.controller.ts
├── datasources/               # In-memory data sources
│   ├── base.datasource.ts
│   └── in-memory/
│       ├── in-memory-post.datasource.ts
│       └── in-memory-user.datasource.ts
├── models/                    # Data models (User, Post)
│   ├── post.model.ts
│   └── user.model.ts
├── repositories/              # Data repositories for business logic
│   ├── post.repository.ts
│   └── user.repository.ts
├── services/                  # Service layer for core logic
│   ├── post.service.ts
│   └── user.service.ts
├── server.ts                  # Entry point of the application
└── .env                       # Environment variables
```

---

## ⚙️ Installation & Setup
1️⃣ **Clone the repository:**

```bash
git clone https://github.com/your-username/ng-posts-users-backend.git
cd ng-posts-users-backend
```

2️⃣ **Install dependencies:**

```bash
npm install
```

3️⃣ **Environment Configuration:**

Create a `.env` file:

```
PORT=5000
```

4️⃣ **Run the application:**

- **Development mode:**

```bash
npm run dev
```

- **Production mode:**

```bash
npm start
```

---

## 📡 API Endpoints
### 🔹 Users
- `GET /api/users` — Get all users  
- `GET /api/users/:id` — Get user by ID  
- `GET /api/users/search?email=example` — Search users by email  
- `POST /api/users` — Create a new user  
- `PUT /api/users/:id` — Update user by ID  
- `DELETE /api/users/:id` — Delete user by ID  

---

### 🔸 Posts
- `GET /api/posts` — Get all posts  
- `GET /api/posts/:id` — Get post by ID  
- `POST /api/posts` — Create a new post  
- `PUT /api/posts/:id` — Update post by ID  
- `DELETE /api/posts/:id` — Delete post by ID  
- `POST /api/posts/:id/like` — Like a post  
- `POST /api/posts/:id/dislike` — Dislike a post  

---

## 🤝 Contributing
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m 'feat: add new feature'`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a Pull Request 🚀  

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).