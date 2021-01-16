import "@/assets/style/theme.scss";
const appTheme = window.localStorage.getItem('appTheme') ?? "theme0";
document.body.classList.add(appTheme);
