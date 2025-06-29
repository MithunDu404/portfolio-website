# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, featuring a clean design with dark/light theme support and interactive elements.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Theme Toggle**: Switch between dark and light modes
- **Dynamic Content**: 
  - Real-time clock display
  - Typewriter effect for professional titles
  - Loading animations
  - Scroll-to-top functionality
- **Project Showcase**: Interactive project cards with technology stacks
- **Contact Form**: Fully functional contact form with backend integration
- **Skills & Education**: Detailed sections showcasing academic and technical background
- **Competitive Programming**: Display of achievements across coding platforms

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts
- Custom SVG Icons

### Backend
- Python
- Flask
- MongoDB
- Flask-CORS
- python-dotenv

## 📦 Project Structure
```
portfolio/
├── index.html              # Main landing page
├── projects.html           # Detailed projects page
├── skills-education.html   # Skills and education details
├── assets/
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   └── main.js        # Frontend functionality
│   └── img/               # Image assets
├── backend/
│   ├── app.py             # Flask backend server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── README.md
```

## ⚙️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd portfolio
   ```

2. **Frontend Setup**
   - Open `index.html` in a web browser
   - For development, use a local server:
     ```bash
     python -m http.server 8000
     ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Create `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

5. **Run the Backend**
   ```bash
   python app.py
   ```

## 🎨 Customization

### Themes
The website supports dark/light themes. Colors can be customized in `styles.css`:
```css
:root {
    --bg-primary: #0f0f0f;
    --accent-primary: #ff6b00;
    /* ... other variables */
}
```

### Content
- Update project information in `projects.html`
- Modify skills and education details in `skills-education.html`
- Edit personal information in `index.html`

## 🔧 Features in Detail

### Contact Form
- Real-time validation
- Backend integration with MongoDB
- Success/error notifications
- Comment count tracking

### Navigation
- Smooth scrolling
- Active section highlighting
- Responsive mobile menu
- Scroll to top button

### Animations
- Loading screen animation
- Hover effects on cards
- Typewriter effect for titles
- Smooth theme transitions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 480px
  - Tablet: < 768px
  - Desktop: > 768px

## 🚀 Deployment

The website is ready for deployment on any static hosting service. The backend requires a Python hosting environment with MongoDB support.

## 👥 Contributing

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue.