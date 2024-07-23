# Real-Time Collaborative To-Do List app

## Overview

This is a simple real-time collaborative to-do list application built with Next.js, TypeScript, React, and WebSockets using Pusher. The application allows multiple users to view, add, mark as done, and delete to-do items in real time.

## Features

- View a default list of 4 to-do items.
- Add tasks to the list.
- Mark tasks as done by clicking a checkbox.
- Delete tasks by clicking a delete button beside each task.
- Real-time updates across multiple users.
- Display the creator of each to-do item.
- Display who marked the to-do item as done.

## Technologies Used

- Next.js
- TypeScript
- React
- Pusher (for WebSocket connections)

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Pusher account (for WebSocket connections)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/haryobamy/workverse.git
   cd repository-name

   ```

2. **Run the app:**

   Install dependencies:

   ```bash
   npm install
   ```

# or

    yarn install

4.  **Set up environment variables:**

        Create a .env.local file in the root of the project and add the following environment variables:

        ```bash
        NEXT_PUBLIC_PUSHER_APP_ID=your_pusher_app_id
        NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
        NEXT_PUBLIC_PUSHER_SECRET=your_pusher_secret
        NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

5.  **Start the development server:**

        npm run dev

# or

yarn dev
