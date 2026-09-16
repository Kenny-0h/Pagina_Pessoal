/**
 * Página Pessoal — Bootstrap
 * JavaScript:
 * 1. Suporte a 3 Temas (Claro, Escuro e Marrom Suave) com alternância sequencial.
 * 2. Preenchimento dinâmico do modal de projetos.
 * 3. Fechamento automático do menu em dispositivos móveis ao clicar nos links.
 */

const THEMES = [
    {id: "light", name: "Tema claro", icon: "☀️"},
    {id: "dark", name: "Tema escuro", icon: "🌙"},
    {id: "warm", name: "Tema marrom", icon: "☕"}
];

const STORAGE_KEY = "personal-page-theme";
const DEFAULT_THEME = "light";

function applyTheme(themeId) {
    const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

    document.documentElement.setAttribute("data-theme", currentTheme.id);

    document.querySelectorAll(".theme-icon").forEach((icon) => {
        icon.textContent = currentTheme.icon;
    });

    document.querySelectorAll(".theme-label").forEach((label) => {
        label.textContent = currentTheme.name;
    });
}

function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const themeExists = THEMES.some((t) => t.id === savedTheme);
    applyTheme(themeExists ? savedTheme : DEFAULT_THEME);
}

function toggleTheme() {
    const currentThemeId = document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
    const currentIndex = THEMES.findIndex((t) => t.id === currentThemeId);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];

    localStorage.setItem(STORAGE_KEY, nextTheme.id);
    applyTheme(nextTheme.id);
}

function setupProjectModal() {
    const modal = document.getElementById("projectModal");

    if (!modal) return;

    modal.addEventListener("show.bs.modal", (event) => {
        const trigger = event.relatedTarget;

        document.getElementById("projectModalLabel").textContent =
            trigger.dataset.projectTitle || "Projeto";

        document.getElementById("projectModalTech").textContent =
            trigger.dataset.projectTech || "";

        document.getElementById("projectModalSummary").textContent =
            trigger.dataset.projectSummary || "";

        document.getElementById("projectModalLink").href = "#";
    });
}

function setupMobileMenuClose() {
    const sidebarEl = document.getElementById("sidebar");
    if (!sidebarEl) return;

    sidebarEl.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarEl);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();

    document.querySelectorAll("#themeToggle, #themeToggleMobile")
        .forEach((button) => button.addEventListener("click", toggleTheme));

    setupProjectModal();
    setupMobileMenuClose();
});