anDREa - Technical Assignment: User Explorer – Full-Stack Developer ( React & UI/UX) Position

## Overview

This project demonstrates an approach to building a user management interface with a strong focus on UI/UX, component structure and interaction with backend data.

Rather than focusing only on functionality, the goal of this assignment was to create a clear and maintainable front-end structure that supports usability, scalability, and clean interaction patterns.

The application allows users to view, search, create, edit, delete, and bookmark users. Throughout the implementation, attention was given to how users interact with the interface and how feedback is provided for their actions.

This approach focuses on three key aspects:

- Creating a consistent and reusable component structure
- Applying a simple design system for visual and interaction consistency
- Providing clear feedback for user actions through UI states and notifications

## Implemented Features

To support usability and clarity, several features were implemented:

**1. User Management (CRUD)**  
Users can be created, edited, and deleted. The interface ensures that these actions are clear and confirmed where needed (e.g. delete confirmation modal).

**2. Search with Debounce**  
The search functionality updates results dynamically while typing, with a small delay to improve performance and avoid unnecessary re-renders.

**3. Bookmarking**  
Users can be bookmarked and filtered. Bookmarks are stored in localStorage so they persist after refreshing the page.

**4. Authentication (Basic)**  
A simple login/logout mechanism is implemented using localStorage to simulate authentication state.

**5. Toast Feedback**  
User actions such as create, update, delete, bookmark, and login/logout trigger toast notifications to provide immediate feedback.

## Component Structure

The application is structured using reusable components to keep responsibilities clear and maintainable:

- **UserList** &rarr;  renders the list of users
- **UserItem** &rarr;  handles individual user rows and actions
- **UserCard** &rarr;  displays detailed user information
- **UserForm** &rarr;  used for both creating and editing users

Reusable UI components:

- **Button** &rarr; supports multiple variants (primary, success, danger, secondary)
- **Modal** &rarr; used for confirmations and user prompts
- **Toast** &rarr; handles global feedback messages

## Styling Approach

The styling is structured to reflect a simple design system:

**Base**  
Defines global styles such as typography, layout, and resets.

**Tokens**  
Centralised variables for colors, spacing, borders, and shadows to ensure consistency.

**Utilities**  
Reusable helper classes for layout and alignment (e.g. flex utilities).

This structure helps maintain consistency across the application and makes it easier to extend or modify the UI.

## UI/UX Decisions

Several design decisions were made to improve usability:

- Clear distinction between action types using color (e.g. success, danger, neutral)
- Consistent interaction patterns (hover, active states) across all buttons
- Use of confirmation dialogs for destructive actions
- Immediate feedback through toast notifications
- Mobile-first responsive layout to ensure usability across devices

##  Technical Notes

- The application is built using React, TypeScript, and Vite
- DummyJSON is used as a mock API (no persistent backend)
- State is managed centrally in `App.tsx`
- LocalStorage is used for bookmarks and authentication state

## API & Data Handling  

The application integrates with an external API (DummyJSON) to fetch and manage user data.  

Although the API used in this assignment does not persist changes, the application is structured to simulate real-world data flows:  

- Data fetching and transformation  
- Handling create, update, and delete operations  
- Managing asynchronous requests and error states  
- Keeping UI state in sync with API responses  

This reflects how front-end components interact with backend services in a typical full-stack environment.

## Additional Information

This project was created as part of a technical assessment. The goal was not only to implement functionality, but also to demonstrate how UI structure, consistency, and user feedback can be approached in a scalable way.

## Installation & Setup
1.	Open a terminal and navigate to the location where you want to store the project  
`cd path/to/your/projects `  
2.	Create a new directory (if needed)  
`mkdir demo-user-explorer`  
3.	Move into the new folder  
`cd demo-user-explorer`  
4.	Clone the github repository into this folder  
`git clone <repository-url> .`  
The space + dot ( .) ensures that the repository is cloned directly into the current directory  
5.	From within the project folder run:   
`npm install` 
6.	Start the local server, run:  
`npm run dev`  
The server will automatically stop when you close the terminal or stop the process
7.	By default, the application will be available at:  
`http://localhost:5173`  
If a different port is used, the correct address will be shown in the terminal


