# Synergy
Synergy is a social media application to check up on your friends. No ads or sponsorships, just real connections.
It is a React Native application designed to provide a seamless experience for users to interact with posts, view profiles, and create new content. It utilizes the GoRest API for fetching and managing user-generated posts and comments.

## Features

- **Home Screen:** Displays a list of posts fetched from the GoRest API, with infinite scrolling.
- **Profile Screen:** Shows user details, including name, email, gender, and status.
- **Post Details Screen:** Provides detailed information about a selected post along with its comments.
- **New Post Screen:** Allows users to create a new post.
- **Dark Mode Support:** Automatically adjusts UI based on the device's theme settings.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:
   ```sh
   gh repo clone Powerscore/Synergy
   ```

2. Navigate to the project directory:
   ```sh
   cd Expo/synergy
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Use an emulator or a physical device to run the app.
   
6.
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

## Screenshots

### Home Screen
![Synergy Home Screen Light Mode](https://github.com/user-attachments/assets/937a3cf6-db39-46b3-8691-78f95ae12498)
![Syngery Home Screen Dark Mode](https://github.com/user-attachments/assets/438e4e79-95aa-4279-947b-15f188e4ae66)

### Profile Screen
![Profile Light Mode](https://github.com/user-attachments/assets/025e5bd3-c47f-4af1-9c76-3c878eb2d1e3)
![Profile Dark Mode](https://github.com/user-attachments/assets/f712a5c5-6074-4cd5-af7c-44053d0d802b)


### Post Details Screen
![Post Details Light Mode](https://github.com/user-attachments/assets/b927f1c4-c956-408c-b1bb-a6e43b86feb1)
![Post Details Dark Mode](https://github.com/user-attachments/assets/82efe7d1-5156-4891-8b10-1e92c97a38b3)

### New Post Screen
![New Post Light Mode](https://github.com/user-attachments/assets/82a3098a-07c4-42b5-a8d1-f2b72a28bc1c)
![New Post Dark Mode](https://github.com/user-attachments/assets/1ead6945-d5b6-4ff7-a926-413f98d4be78)

## Technologies Used

- **React Native**: Cross-platform mobile development framework.
- **Expo Router**: Navigation and routing solution for React Native.
- **Tailwind CSS (twrnc)**: Styling framework for React Native.
- **GoRest API**: Provides sample user data and posts.

## API Reference

The app interacts with the GoRest API for fetching and posting data:

- Fetch Posts:
  ```sh
  GET https://gorest.co.in/public/v2/posts?page=1
  ```
- Fetch Post Details:
  ```sh
  GET https://gorest.co.in/public/v2/posts/{id}
  ```
- Fetch User Profile:
  ```sh
  GET https://gorest.co.in/public/v2/users/{user_id}
  ```
- Create a Post:
  ```sh
  POST https://gorest.co.in/public/v2/users/{user_id}/posts
  ```

## Contribution

Contributions are welcome! Feel free to submit a pull request or open an issue.

