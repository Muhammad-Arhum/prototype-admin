# Nexus MedTech Admin Dashboard

This is the admin dashboard for managing the content of the Nexus MedTech website.

## Setup

1.  Navigate to this folder:
    ```bash
    cd admin-panel
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```

## Running the Dashboard

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

-   **Events**: Manage upcoming events (edit title, description, type, icon).
-   **Projects**: Manage research projects.
-   **Blog**: Create and edit blog posts.

## Note

This dashboard reads and writes directly to the JSON files in `../src/data/`. Ensure the main application folder is accessible.
