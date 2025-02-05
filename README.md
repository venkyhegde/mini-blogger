# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---
## How to Run locally
---
### Step 1.  Start Backend service

###  Using  Backend json-server 

Use the Json server to quickly spin up backend server backed by `db/db.json` file. Use below command to start the json server from project's root directory. 

```
npx json-server --watch db/db.json --port 8000
```

Executing this command will start the Json server, on successful setup it should print Resources URL on console. 

```cmd
22-07-27T23:32 mini-blogger$ npx json-server --watch db/db.json --port 8000

  \{^_^}/ hi!

  Loading db/db.json
  Done

  Resources
  http://localhost:8000/posts

  Home
  http://localhost:8000

  Type s + enter at any time to create a snapshot of the database
  Watching...

```
### Step 2:Provide backend service URLs thorugh environment variables. 
Provide this URL through an environment variable with name - `REACT_APP_VIEW_MINI_BLOG_BACKEND_URL` and `REACT_APP_MANAGE_MINI_BLOG_BACKEND_URL` . Reason for requiring two separate environment variable as it's common practice to have different backend micro services for managing and viewing the resources. In that case we can provide separate backend URLs through these. In case of Json server both URLs are same so 

> Note: Don't supply forward slash `/` at the end of URL. 


### Step 3: Start this UI application.
Start this application using one of appropriate command, refer above section. 


### Icons used in this application
https://lucide.dev/docs/lucide-react


Created the basic modular React application "Mini Blogger".
Final works are pending.
- [ ] Read URLs from env variables. 
- [ ] Clean up the readme. 
- [ ] Update the readme.
URL 1 - http://localhost:8000/posts 
URL 2 - http://localhost:8000/posts/ 
URL 3 - http://localhost:8000/posts/ 
URL 4 - http://localhost:8000/posts/ 
