import "@/assets/style/theme.scss";
const appTheme = window.localStorage.getItem('appTheme') ?? "theme7";
document.body.classList.add(appTheme);
