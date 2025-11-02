const themes = ['light', 'dark', 'retrowave'] as const;
type ThemePref = typeof themes[number];

const getSavedTheme = (): ThemePref => {
    const saved = localStorage.getItem('theme') as ThemePref | null;
    if (saved && themes.includes(saved)) return saved;
    // Default to system-like behavior: respect OS on first load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = prefersDark ? 'dark' : 'light';
    localStorage.setItem('theme', initial);
    return initial;
};

export const getNextTheme = (): ThemePref => {
    const saved = getSavedTheme();
    const index = themes.indexOf(saved);
    return themes[(index + 1) % themes.length];
};

export const applyTheme = (pref?: ThemePref) => {
    const p = pref ?? getSavedTheme();
    document.documentElement.dataset.theme = p;
};

export const updateToggleThemeIcon = () => {
    // Hide all icons first
    document.querySelectorAll('#icon-theme-light, #icon-theme-dark, #icon-theme-retrowave')
        .forEach(el => el.classList.add('hidden'));
    // Show next icon (what will be applied on click)
    const next = getNextTheme();
    document.querySelector(`#icon-theme-${next}`)?.classList.remove('hidden');
};

export const toggleMarkdownTheme = (newTheme: string) => {
    const contentElement = document.getElementById('markdown');
    if (!contentElement) {
        return;
    }

    if (newTheme === "dark" || newTheme === 'retrowave') {
        contentElement.classList.add('prose-invert');
    } else {
        contentElement.classList.remove('prose-invert');
    }
};
