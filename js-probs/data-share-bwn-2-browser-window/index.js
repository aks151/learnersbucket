let loginWindow;

const openLogin = () => {
  loginWindow = window.open("login.html", "_blank");
};

const sendMsgToLogin = () => {
  loginWindow.postMessage({ login: "Hello from Home" }, "*");
};

const sendMsgToHome = () => {
  window.opener.postMessage({ home: "Hello from Login" }, "*");
  setTimeout(() => {
    window.close();
  }, 2000);
};

window.addEventListener("message", (event) => {
  if (event.data?.home) {
    console.log("Home page received a message", event.data?.home);
  }

  if (event.data?.login) {
    console.log("Login page received a message", event.data?.login);
  }
});
