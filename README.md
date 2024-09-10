# Inspirational Quotes App

##  Project Description

This project is a web application where users can log in, view, and create inspirational quotes with accompanying images. The application is fully responsive and optimized for mobile devices. It allows users to upload images, add text to quotes, and display a paginated list of quotes.

##  Project Feature List

- **Login System**: Users log in using a unique username and OTP (i.e  `1234`).
- **Paginated Quote List**: Display quotes with text and images, allowing users to load more quotes.
- **Create New Quote**: Users can create new quotes by uploading an image and adding text.
- **Image Upload**: The app supports uploading images and fetching the media URL.
- **Error Handling**: Errors are displayed using toast notifications (snackbars) to provide feedback for actions like failed login or API errors.
- **Responsive Design**: The app is designed to work seamlessly on all screen sizes, including mobile and desktop.

## 3. How to Run the Project Locally

### Prerequisites:
- **Node.js** (>= 14.x.x)
- **npm** or **yarn**

### Steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/deeqakkk/inspirational-quotes-app.git
   cd inspirational-quotes-app
   ```

2. **Install dependencies**:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Run the development server**:

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open the app** in your browser at:

   ```
   http://localhost:5173
   ```

### Build for production:

To create an optimized production build, you can run:

```bash
npm run build
```

This will create a `dist/` folder with the production build files.

## Project Tech Stack Used

- **Frontend**: React (Vite)
- **Styling**: Material UI (MUI)
- **Routing**: React Router DOM
- **Deployment**: Netlify

## Project Live Link

The project is live and accessible at: [Netlify Deployed Link](https://inspiring-folks.netlify.app/)
