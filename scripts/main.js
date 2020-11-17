const btnDismissNotification = document.querySelector(
  "#dismiss_cookie_notification"
);
const cookieNotification = document.querySelector("#cookie_notification");
btnDismissNotification.addEventListener("click", () => {
  cookieNotification.classList.add("hidden");
});
