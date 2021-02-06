import Application from './app/Application';

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  console.log(app.data.universe)
  // Used for automated testing only
  if (process.env.NODE_ENV === 'development') {
    window.__JS_APP = app;
  }
});
