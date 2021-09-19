# Frontend Mentor - Product feedback app solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: https://your-solution-url.com
- Live Site URL: http://feedback-board.frontendtony.com/

## My process

### Built with

- [Vite](https://vitejs.dev/) (Build Tool)
- [React](https://reactjs.org/) (UI Library)
- [Tailwindcss](http://tailwindcss.com/) (Utility CSS generator)
- [Supabase](https://supabase.io/) (Backend as a service)
- [Typescript](https://www.typescriptlang.org/) (JavaScript, without the headache)
- [React Router](https://reactrouter.com/web/guides/quick-start) (Client-side routing for React)

### What I learned

#### Setting up a backend service with Authentication using Supabase.

Authenticating a user is as easy as:

```ts
await supabase.auth.signUp({
  email: values.email,
  password: values.password,
});
```

### Useful resources

- [Vite PWA Plugin](https://vite-plugin-pwa.netlify.app/) - I used this to easily add PWA functionality to the app, making it installable and work offline
- [React Router Animated Transitions](https://reactrouter.com/web/example/animated-transitions) - I used this to make the app feel more "app like", with subtle transitions when navigating between pages

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Anthony Oyathelemhi](https://frontendtony.com)
- Frontend Mentor - [@frontendtony](https://www.frontendmentor.io/profile/frontendtony)
- Twitter - [@frontendtony](https://www.twitter.com/frontendtony)
