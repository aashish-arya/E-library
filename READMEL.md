# 📚 E-Library Web App

Welcome to **E-Library**, a full-stack MERN web application that offers users a way to browse and read books online. It features both free and paid books with secure login, smooth UI transitions, and protected routes.

🔗 **Live Demo:** [https://e-library-frontend-eta.vercel.app/](https://e-library-frontend-eta.vercel.app/)

---

## ✨ Features

### ✅ Public Features (No Login Required)

- 📖 Browse **Free Books** directly from the homepage.
- 🖼️ Image-based **Book Slider** with Framer Motion animations.
- 📄 Pages available:
  - Home
  - About
  - Contact
  - Signup/Login (via Modal)

### 🔐 Protected Features (Login Required)

- 🔓 View **Paid Books** only after successful login.
- ✅ JWT-based authentication using **HTTP-only Cookies**.
- 🧠 Global auth state managed using **React Context API**.
- ❌ Unauthenticated users can't access the `/book` route.

---

## ⚙️ Tech Stack

### Frontend:

- **React.js**
- **Tailwind CSS**
- **Framer Motion**
- **React Router DOM**
- **React Hook Form**
- **Axios**
- **React Hot Toast**

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** (JSON Web Token)
- **bcryptjs**

---

## 🔐 Auth Flow

- User signs up or logs in via modal form.
- Login sends a POST request → receives a token → stored as an HTTP-only cookie.
- React Context API stores login state in `authUser`.
- Protected routes (like `/book`) check login state before access.

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Freebook.jsx
│   ├── Reader.jsx
│   ├── Signup.jsx
│   └── Scrolltop.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Bookspage.jsx
│   └── Readpage.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── App.jsx
├── main.jsx
```

---

## 🧑‍💻 Developer Info

**Aashish Kumar Arya**\
📧 Email: [ashisharya9058@gmail.com](mailto\:ashisharya9058@gmail.com)\
🔗 GitHub: [https://github.com/aashish-arya](https://github.com/aashish-arya)\
🔗 LinkedIn: [https://www.linkedin.com/in/aashish-arya-34065433a/](https://www.linkedin.com/in/aashish-arya-34065433a/)

---

## 📃 License

This project is open-source and free to use for learning purposes.

