# Password Manager

Password Manager is a robust web application designed to securely store and manage your passwords. Utilizing the MERN stack (MongoDB, Express.js, React, and Node.js), it offers a secure and user-friendly interface for password storage and retrieval with encryption and decryption capabilities.

## Features

- **Secure Encryption**: Passwords are encrypted using AES-256-CTR before storage, ensuring your data remains secure.
- **Intuitive Interface**: Easy to navigate UI for adding, viewing, and managing passwords.
- **Real-time Decryption**: Decrypt your passwords securely and view them as needed with a simple click.

## Getting Started

### Prerequisites

Before setting up the Password Manager, ensure you have the following installed:
- Node.js (Preferably the latest stable version)
- MongoDB running locally or remotely accessible

### Installation

Clone the repository and install dependencies for both the client and server:

```bash
# Clone the repository
git clone https://github.com/yourgithubusername/password-manager.git
cd password-manager

# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../Client
npm install
