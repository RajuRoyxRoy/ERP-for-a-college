document.getElementById('menu-btn').addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('open');
});

document.getElementById('close-btn').addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('open');
});

const themeToggler = document.querySelector('.theme-toggler');
const root = document.querySelector(':root');
const darkThemeColors = {
    '--color-background': '#181a1e',
    '--color-white': '#202528',
    '--color-dark': '#edeffd',
    '--color-dark-variant': '#a3bdcc',
    '--color-light': 'rgba(0, 0, 0, 0.4)',
    '--box-shadow': '0 2rem 3rem rgba(0, 0, 0, 0.4)',
};
const lightThemeColors = {
    '--color-background': '#f6f6f9',
    '--color-white': '#fff',
    '--color-dark': '#363949',
    '--color-dark-variant': '#677483',
    '--color-light': 'rgba(132, 139, 200, 0.18)',
    '--box-shadow': '0 2rem 3rem rgba(132, 139, 200, 0.18)',
};

themeToggler.addEventListener('click', () => {
    themeToggler.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
    if (themeToggler.querySelector('.light_mode').classList.contains('active')) {
        Object.keys(lightThemeColors).forEach(key => {
            root.style.setProperty(key, lightThemeColors[key]);
        });
    } else {
        Object.keys(darkThemeColors).forEach(key => {
            root.style.setProperty(key, darkThemeColors[key]);
        });
    }
});
