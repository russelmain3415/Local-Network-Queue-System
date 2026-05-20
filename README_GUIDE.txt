NBI QUEUE SYSTEM - SETUP GUIDE (WINDOWS 7/10/11)

This system is designed to run on a local network for up to 18 counter PCs and 1 TV display.

SECTION 1: PREREQUISITES (IMPORTANT FOR WINDOWS 7)
The server PC (the main one) requires Node.js to be installed to run the system.
- Version to Download: Node.js v13.14.0 (or newer if using Windows 10/11)
- Requirement Note: Newer versions of Node.js do not support Windows 7. If you are operating on Windows 7, you must utilize v13.14.0.
- Download Reference: Search for "node-v13.14.0-x64.msi" (or "x86" for 32-bit systems).

SECTION 2: STARTING THE SERVER
1. On the Main PC, navigate to the folder containing the queue files.
2. Execute the file named run_server.bat.
3. A Command Prompt window will initialize, displaying the server IP and access links.
4. IMPORTANT: Do not close this window. The system will only remain functional while this window is active.
5. DEFAULT PAGE: The system now defaults to info_desk.html for basic issuance and management.

SECTION 3: CONNECTING WORKSTATIONS
Once the server window is active, identify the following access links (addresses may vary):
- Information Desk: http://192.168.1.XX:80/ (The default page) or http://192.168.1.XX/info_desk.html
- TV Display: http://192.168.1.XX/tv_display.html
- Counter PCs: http://192.168.1.XX/counter_1.html (Adjust the number for each workstation)

PROCEDURE FOR COUNTER PCS (1-18):
1. Open a web browser (Chrome or Edge).
2. Enter the specific link for the workstation (e.g., counter_1.html).
3. Provide the PIN when prompted.
   - PIN Format: "MP-" followed by the Counter Number (2 digits), e.g., MP-01, MP-12.

PROCEDURE FOR THE TV DISPLAY:
1. Open the web browser on the PC connected to the lobby display.
2. Enter the TV Display link into the address bar.
3. Click anywhere on the screen after loading to engage the audio announcement system.
4. Press F11 on the keyboard to enable full-screen mode.

SECTION 4: PIN AND SECURITY
Administrative actions require a PIN based on the counter identification:
- PIN Format: "MP-XX" where XX is the 2-digit counter number.
- Example for Counter 1: MP-01 (or mp-01)
- Example for Counter 10: MP-10 (or mp-10)
- Information Desk PIN: MP-00 (Required for system resets and issuance updates).

SECTION 5: DATA AND STORAGE
The system utilizes a JSON-based database system for persistence:
- Logic: Handled by database.js.
- Storage: All queue data, ticket counts, and history are stored in data.json.
- Stability: The system automatically saves changes to data.json instantly to ensure no data is lost even if the server crashes or the PC restarts.

SECTION 6: SYSTEM SECURITY FEATURES
1. SERVER-SIDE VALIDATION: All actions (Calling, Clearing, Resetting) are verified by the server. Bypassing the browser interface will not work as the server requires a valid matching PIN for every request.
2. NETWORK ACCESS: The server is set to allow any device on your local office network for easier connection across different office routers. To restrict access to specific staff only, use the browser-level PIN system.
3. XSS PROTECTION: The system automatically strips HTML tags from all inputs. This prevents malicious users from injecting scripts into names or ticket types that could disrupt the TV display or staff screens.
4. LOCAL NETWORK ENFORCEMENT: The system only listens to the local office network and is invisible to the public internet.

SECTION 7: MAINTENANCE & TROUBLESHOOTING
- Resetting the Queue: Use the "Reset" button on the Information Desk at the end of the day (Requires PIN MP-00).
- History: The system keeps a history of the last 20 states in data.json for safety.
- Browser: Use Google Chrome or Microsoft Edge for best results.
- PORT CONFLICT (IMPORTANT): The system runs on Port 80. If the server fails to start, ensure no other software (like Skype, IIS, or XAMPP) is using Port 80. You may need to stop those services before running the queue server.
