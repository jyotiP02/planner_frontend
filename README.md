<img width="1918" height="905" alt="Screenshot 2025-07-19 214006" src="https://github.com/user-attachments/assets/c9d62d17-64d5-4a2d-b688-d3f5ecff4db9" />
# Planner Frontend

Frontend for the Event Planner Web App.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## 📦 Technologies Used

- **React** – UI library
- **Tailwind CSS** – for styling
- **Axios** – for API calls
- **React Router** – for routing
- **React Toastify** – for notifications

---

## 🚀 Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jyotiP02/planner_frontend.git

Navigate to the project folder:   
cd event_planner_frontend

Install dependencies:
npm install

Start the development server:
npm start

🌐 API Endpoints (from Backend)
| Method | Route             | Purpose                   |
| ------ | ----------------- | ------------------------- |
| POST   | `/signup`         | Register new user         |
| POST   | `/login`          | Authenticate user         |
| GET    | `/events`         | List all events           |
| POST   | `/events`         | Create event (Admin only) |
| PUT    | `/events/:id`     | Update event (Admin only) |
| DELETE | `/events/:id`     | Delete event (Admin only) |
| POST   | `/rsvp/:event_id` | RSVP for an event         |
| GET    | `/my-rsvps`       | View my RSVP list         |

📈 ER Diagram (Text Representation)
User(id, name, email, password, role)
Event(id, title, description, date, start_time, end_time, location, image_url)
RSVP(id, user_id, event_id, status)


🔗 Deployed Link
https://planner-frontend-06ok.onrender.com

📄 Available Scripts
In the project directory:
npm start: Start dev server

npm run build: Build for production

npm test: Run tests
