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
