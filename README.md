# 🚀 MegaBlog - A Full-Stack Blogging Platform 

MegaBlog is a modern, high-performance blogging application built with **React**, **Redux Toolkit**, and **Appwrite**. It features a clean, responsive UI and a robust backend integration for authentication, database management, and file storage.

---

## ✨ Features

- **🔐 Secure Authentication:** User signup, login, and logout powered by Appwrite Auth.
- **📝 Full CRUD Functionality:** Create, Read, Update, and Delete blog posts with ease.
- **🖼️ Image Uploads:** Integrated file storage for featured images.
- **🎨 Rich Text Editor:** A professional editing experience using TinyMCE.
- **📱 Fully Responsive:** Beautifully designed UI that works on desktops, tablets, and mobile devices.
- **🛡️ Protected Routes:** Secure navigation ensuring only authorized users can create or edit content.
- **⚡ Optimized Performance:** Fast loading times with Vite and efficient state management with Redux.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **State Management:** Redux Toolkit
- **Backend-as-a-Service:** Appwrite (Auth, Database, Storage)
- **Forms:** React Hook Form
- **Editor:** TinyMCE
- **Icons:** Lucide-React

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sumit12827/MegaBlog.git
cd MegaBlog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Appwrite credentials:
```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""
```

### 4. Run the Project
```bash
npm run dev
```

---

## 📂 Project Structure

```
src/
├── appwrite/      # Appwrite service configurations (Auth & Database)
├── components/    # Reusable UI components (Header, Footer, Input, etc.)
├── conf/          # Environment variable configuration
├── pages/         # Page components (Home, AllPosts, AddPost, etc.)
├── store/         # Redux Toolkit slices and store configuration
└── App.jsx        # Main application component
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas to improve this project.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Developed with ❤️ by [Sumit](https://github.com/Sumit12827)
