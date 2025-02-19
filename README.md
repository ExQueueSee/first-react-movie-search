# Movie Hub

![Movie Hub Banner](public/logo.png)

Movie Hub is a responsive web application built with **React** and **Vite** that allows users to search for movies and view trending movies. The app fetches movie data from **The Movie Database (TMDB) API** and presents it in an intuitive interface.

## 🚀 Features

- 🔍 **Search** for movies by title
- 🎬 **View movie details** including rating, language, and release year
- 📈 **Top 10 trending movies** display
- 📱 **Responsive design** for both mobile and desktop
- 🔗 **Appwrite integration** to track search counts

## 🛠 Technologies Used

- **React**
- **Vite**
- **Tailwind CSS**
- **Appwrite**
- **TMDB API**

## 📦 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### 📥 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/first-react-movie-search.git
   cd first-react-movie-search
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```ini
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

### 🚀 Running the App

To start the development server:
```sh
npm run dev
```

To build the app for production:
```sh
npm run build
```

To preview the production build:
```sh
npm run preview
```

### 📡 Deployment
The app is configured to deploy to **GitHub Pages**. To deploy, run:
```sh
npm run deploy
```

## 📂 Folder Structure

```plaintext
first-react-movie-search/
├── public/
│   ├── hero-bg.png
│   ├── hero.png
│   ├── imdb_logo.png
│   ├── logo.png
│   ├── no-movie.png
│   ├── search.svg
│   ├── star.svg
│   └── tmdb_logo.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── appwrite.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── CNAME
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- 🎥 [TMDB API](https://www.themoviedb.org/)
- 🚀 [Appwrite](https://appwrite.io/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- ⚡ [Vite](https://vitejs.dev/)

---
💡 **Make sure to replace placeholders like** `your-username` **and** `your_tmdb_api_key` **with actual values before using this README.**

