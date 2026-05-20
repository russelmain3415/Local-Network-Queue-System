# Local Queuing System

A lightweight, self-hosted queuing system designed to manage customer flow in a local office environment. Built with vanilla JavaScript and a Node.js backend, this system is optimized for simplicity and can run on a local network without an internet connection. It supports up to 18 counters, an information desk, and a public-facing TV display.

## Key Features

- **Real-Time Queue Management**: Handles ticket issuance, calling, and counter status updates in real-time.
- **Multiple User Interfaces**:
    - **Information Desk**: Central hub for issuing tickets, assigning them to counters, and monitoring overall workload.
    - **Counter Display**: Individual interface for each of the 18 counters to manage their assigned tickets (call, re-announce, no-show, finish).
    - **TV Display**: A public-facing screen that shows the latest called tickets and directs applicants to the correct counter.
- **Audio Announcements**: The TV display announces called ticket numbers to alert applicants.
- **PIN-Based Security**: Actions on both the counter and information desk pages are protected by a simple PIN system to prevent unauthorized use.
- **Persistent Data**: Uses a simple JSON file (`data.json`) as a database to store the queue state, ensuring data is not lost if the server restarts.
- **Zero Dependencies**: Runs on a standard Node.js installation with no external npm packages required, making setup straightforward.
- **Network-Friendly**: Designed to be easily deployed on a local office network.

## Technology Stack

- **Backend**: Node.js
- **Frontend**: HTML, CSS, and Vanilla JavaScript (ES5/ES6)
- **Database**: JSON file for data persistence.

## How It Works

The system operates on a client-server model:

1.  A **Node.js server** (`start_server.js`) handles all the logic, including managing the queue, validating PINs, and serving the HTML/JS/CSS files.
2.  The **Information Desk** (`info_desk.html`) acts as the primary control panel, allowing staff to issue new tickets and view the status of all counters.
3.  **Counter PCs** (`counters/counter_*.html`) connect to the server to receive their assigned tickets and update their status.
4.  The **TV Display** (`tv_display.html`) continuously polls the server for the latest data and updates its screen whenever a new ticket is called or a counter's status changes.

All communication happens through simple HTTP requests to the Node.js server, which reads from and writes to the `data.json` file.

## Architectural Choices

### Why a JSON File for a Database?

This system uses a simple JSON file (`data.json`) for data persistence, which was a deliberate design choice for the following reasons:

-   **Maximum Compatibility**: The primary goal is to ensure the system runs flawlessly on older operating systems like Windows 7, which are still common in many government offices. This approach removes the need to install and configure a separate, modern database server (like MySQL or PostgreSQL), which may not be compatible or permitted in such environments.
-   **Zero Dependencies**: By relying on Node.js's built-in file system module (`fs`), the system remains lightweight and dependency-free. This makes it incredibly easy to set up—just install Node.js and run the server.
-   **Simplicity and Reliability**: For a local, single-server application with a limited number of concurrent users, a JSON file is a robust and straightforward solution. It simplifies the architecture and reduces potential points of failure.

This design ensures that the system is high-quality, reliable, and accessible to users in environments with technical or administrative restrictions.

## How to Run

1.  **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed on the main server PC.

2.  **Start the Server**:
    *   Navigate to the project folder.
    *   Execute the `run_server.bat` file.
    *   A command prompt window will open, displaying the server's local IP address. **Do not close this window**, as the server will stop running.

3.  **Access the System**:
    *   **Information Desk**: Open a browser and go to `http://<SERVER_IP>/info_desk.html`
    *   **Counter PCs**: For each counter, open a browser and go to `http://<SERVER_IP>/counter_1.html` (replace `1` with the appropriate counter number).
    *   **TV Display**: On the PC connected to the public display, open a browser and go to `http://<SERVER_IP>/tv_display.html`. Click anywhere on the screen to enable audio.

    *(Replace `<SERVER_IP>` with the actual IP address shown in the command prompt when you started the server.)*

