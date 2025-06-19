# Integrated Community Platform

An all-in-one web platform designed to connect community members through features such as a marketplace, emergency alerts, events, lost & found, and more.

## Features

- **Marketplace:** Buy and sell items within your community.
- **Emergency Alerts:** Receive and send urgent notifications.
- **Events:** Discover and join local events.
- **Lost & Found:** Report or find lost items.
- **User Dashboard:** Quick access to all features and activity summaries.

## Project Structure

```
.
├── backend/
│   ├── database.js
│   ├── server.js
│   ├── middleware/
│   └── routes/
├── database/
│   └── integrated_community_platform.sql
├── frontend/
│   ├── *.html
│   ├── css/
│   └── scripts/
├── images/
├── .env
├── .gitignore
├── ERdiagram.jpg
├── LICENSE
├── package.json
├── project_proposal_report.pdf
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository.
2. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```
3. Configure environment variables in `.env`.
4. Set up the database using the SQL script in [`database/integrated_community_platform.sql`](database/integrated_community_platform.sql).
5. Start the backend server:
    ```sh
    node server.js
    ```
6. Open the frontend HTML files in your browser (e.g., [`frontend/index.html`](frontend/index.html)).

## Documentation

- [Project Proposal Report (PDF)](project_proposal_report.pdf)
- [ER Diagram](ERdiagram.jpg)

## Authors

- **badhon-dalbot**
- **5s4d1**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

© 2024 badhon-dalbot & 5s4d1