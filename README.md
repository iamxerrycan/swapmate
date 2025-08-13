# 🔁 SwapMet - Barter Exchange Platform

SwapMet is a full-stack barter-based item exchange platform where users can list items they want to swap (like books, electronics, clothes, etc.) and request swaps with others nearby.

> 📦 Built with **Node.js**, **Express**, **MongoDB**, **JWT Auth**,**Rest API**, **Socket IO** and **Multer**

---

## 📌 Features

- ✅ User registration and login (JWT protected)
- ✅ Add item with category, description, address, optional image & coordinates
- ✅ Get all items (optionally filter by category or nearby location)
- ✅ Get item by ID
- ✅ Get current user's items
- ✅ Mark item as swapped
- ✅ Store item location using GeoJSON (MongoDB `2dsphere`)
- ✅ Image upload support (Multer – local, optional Cloudinary)
- ✅ Fully RESTful API structure
- ✅ Middleware-protected routes
- ✅ Swap request system
- ✅ Real-time chat using Socket.IO

---

## 🧠 Technologies Used

| Tech                             | Purpose               |
| -------------------------------- | --------------------- |
| **Node.js + Express**            | Backend framework     |
| **MongoDB + Mongoose**           | NoSQL Database        |
| **JWT (jsonwebtoken)**           | Auth tokens           |
| **bcryptjs**                     | Password hashing      |
| **Multer**                       | File/image upload     |
| **dotenv**                       | Environment variables |
| **Socket.IO**                    | Real-time chat        |
| **Cloudinary / S3** _(optional)_ | Image hosting         |
| **MongoDB GeoJSON + 2dsphere**   | Geo queries           |

---

## ⚙️ Setup & Run Instructions

```bash
git clone https://github.com/yourusername/swapmet.git
cd swapmet
npm install
```
