# 🚀 DevEvent | Modern Event Management Platform

**DevEvent** is a full-stack web application that allows users to create and manage their own events.  
It includes advanced features for **user authentication** and **guest booking**, offering a seamless experience for both organizers and attendees.

---

## ✨ Features

The application is built using the latest **Next.js App Router** and **TypeScript**, featuring the following key functionalities:

- 🔐 **User Authentication:** Secure login and registration handled using **NextAuth**.  
- 🧑‍💻 **Event Creation:** Logged-in users can create, view, and manage their personal events.  
- ✉️ **Guest Booking:** Attendees can quickly book an event using only their email (no login required).  
- ⚡ **Real-time Data:** Event and booking information is managed and updated instantly using **MongoDB**.  
- 📱 **Responsive Design:** Powered by **Tailwind CSS**, providing a smooth experience across all devices (mobile, tablet, and desktop).

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|------------|-------------|-------------|
| **Framework** | Next.js (App Router) | High-performance React framework |
| **Language** | TypeScript | Ensures type safety and clean code |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development |
| **Database** | MongoDB | Flexible NoSQL database optimized for scalability |
| **Authentication** | NextAuth.js | Handles session-based authentication securely |
| **Deployment** | Vercel | Seamless deployment and hosting for Next.js apps |

---

## 🚀 Local Setup

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository
```
git clone https://github.com/muhammadali1631/dev-event/
cd dev-event
```

### 2️⃣ Install Dependencies
```
npm install
# or
yarn install
```

### 3️⃣ Configure Environment Variables

Create a .env.local file in the root directory and add the following:
```
# MongoDB Connection
MONGODB_URI="<Your MongoDB Connection String>"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<A Long and Unique Secret Key>"

# Cloudinary Connection (if using for image uploads)
CLOUDINARY_URL=

# Provider Credentials (Optional: for Google or GitHub login)
# GOOGLE_CLIENT_ID="<ID>"
# GOOGLE_CLIENT_SECRET="<SECRET>"
```

### 4️⃣ Run the Application
```
npm run dev
# or
yarn dev
```

Now open your browser and visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

The application is fully deployed and optimized on **Vercel** for production use.

🔗 **Live Demo:** [https://personal-portfolio-ali.vercel.app/](https://personal-portfolio-ali.vercel.app/)

---

## 🧑‍💻 Author

This project was developed by **Ali** — a Front-End Developer & UI/UX Designer passionate about building interactive, modern web experiences.

| Resource | Link |
|-----------|------|
| 🌐 **Portfolio** | [https://personal-portfolio-ali.vercel.app/](https://personal-portfolio-ali.vercel.app/) |
| 💼 **LinkedIn** | [https://www.linkedin.com/in/ali-web-dev/](https://www.linkedin.com/in/ali-web-dev/) |

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it with attribution.

---

⭐ **If you like this project, don’t forget to star the repo!**


