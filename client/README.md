# 📧 InboxAI - Smart Email Categorization Engine

A full-stack AI application that intelligently sorts emails into **Work**, **Personal**, and **Promotions** categories using Large Language Models (LLM). It features a "Human-in-the-Loop" workflow where users can correct AI predictions to track and improve system accuracy.

![Project Screenshot](./screenshot.png)

## 🚀 Key Features

* **🤖 AI Classification:** Automatically tags incoming emails based on context (e.g., "Jira" -> Work, "Sale" -> Promotions).
* **📊 Live Analytics Dashboard:** Real-time tracking of total volume and AI accuracy rates.
* **🔄 Interactive Corrections:** Users can override AI tags via a dropdown, which updates the database and recalculates accuracy scores instantly.
* **🎨 Advanced UI:** Built with Material UI, featuring category filtering, avatars, and responsive design.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Material UI (MUI)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **AI Engine:** Google Gemini Pro (via Generative AI SDK)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/smart-email-service.git](https://github.com/YOUR_USERNAME/smart-email-service.git)
    cd smart-email-service
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    # Create a .env file with:
    # MONGODB_URI=your_mongodb_connection_string
    # GEMINI_API_KEY=your_google_api_key
    node index.js
    ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 📸 Demo Workflow

1.  Click **"Simulate Incoming Email"** to generate a random email.
2.  Watch the AI assign a category (e.g., "Personal").
3.  If incorrect, use the dropdown to change it to "Work".
4.  Observe the **"AI Accuracy"** score update in real-time.