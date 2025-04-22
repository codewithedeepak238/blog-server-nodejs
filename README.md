# 🚀 Blog Server

A full-featured blog backend API built using **TypeScript**, **Node.js**, **Express**, **MongoDB**, and **AWS S3** for image uploads.

---

## 🧱 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Multer-FF1493?style=for-the-badge&logoColor=white"/>
</p>

---

## 📁 Project Structure

Blog-Server/ ├── models/ ├── controllers/ ├── routes/ ├── middleware/ ├── utils/ ├── index.ts ├── app.ts ├── tsconfig.json ├── .env ├── README.md

---

## ⚙️ Features

- 📝 Create, update, and read blogs
- 🖼 Upload banner images to AWS S3
- 🧠 Nested rich content structure (paragraphs, images, code, lists)
- 🪝 Slugified `blog_id` from blog title
- 🧵 Organized folder structure (MVC)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/blog-server.git
cd blog-server

---

2. Install dependencies
npm install

3. Create a .env file
PORT=3500
MONGODB_URI=mongodb://localhost:27017/blogs_ts

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

4. Run the app in development
npm run dev

---

❤️ _Made with passion by [codewithedeepak238](https://github.com/codewithedeepak238)_
