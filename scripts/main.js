const btnDismissNotification = document.querySelector(
  "#dismiss_cookie_notification"
);

const cookieNotification = document.querySelector("#cookie_notification");
btnDismissNotification.addEventListener("click", () => {
  cookieNotification.classList.add("hidden");
  setCookie("accept", "1", 86400);
});

const setCookie = (name, value, life) => {
  console.log("setting cookie...: ", name);
  let cookie = name + "=" + encodeURIComponent(value);
  if (typeof life === "number") cookie += "; max-age=" + life;
  document.cookie = cookie;
  console.log("cookie: ", getCookie(name));
};
const checkCookie = () => {
  if (getCookie("accept") === "1") return true;
  return false;
};
const getCookie = (name) => {
  let cookieFile = document.cookie;
  let cookies = cookieFile.split(";");
  if (cookies && cookies.length > 0) {
    cookies.forEach((cookie) => {
      let parts = cookie.split("=");
      if (parts && parts.length > 0) {
        console.log("cookies: ", name + "/" + parts[1] + "//" + parts[0]);
        if (parts[0].toLowerCase() == name.toLowerCase()) return parts[1];
        return null;
      }
    });
  }
};

document.addEventListener("load", () => {
  console.log("cookie: ", getCookie("accept"));
  if (checkCookie()) cookieNotification.classList.add("hidden");
});
