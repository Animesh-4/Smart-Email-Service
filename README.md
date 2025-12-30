# Smart Email Categorization Service

## Project Overview

This is a full-stack application designed to intelligently manage incoming emails. It fetches emails from a test inbox, utilizes the OpenAI API to categorize them into predefined buckets (Promotions, Personal, Work), and presents them in a modern React user interface.

A key feature is the "human-in-the-loop" workflow, allowing users to correct AI categorizations. The system tracks these corrections to compute and display accuracy metrics, simulating a real-world ML feedback loop.

## Key Features

* **Email Fetching:** Securely connects to an IMAP server to retrieve incoming message metadata.
* **AI Classification:** Leverages Large Language Models (OpenAI) to analyze email content and assign categories.
* **Correction Workflow:** Interactive UI allowing users to override AI predictions.
* **Accuracy Tracking:** Real-time calculation and display of categorization accuracy based on user feedback.

## Technology Stack

**Frontend:**
* React.js (Vite)
* Material-UI (Component Library)

**Backend:**
* Node.js runtime
* Express.js framework
* IMAP library (email fetching)

**Database & AI:**
* MongoDB (with Mongoose ODM) for storing email metadata and classifications.
* OpenAI API for categorization logic.