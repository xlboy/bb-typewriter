import "@/assets/style/theme.scss";
const appTheme = localStorage.getItem('appTheme') ?? "theme0";
document.body.classList.add(appTheme);
