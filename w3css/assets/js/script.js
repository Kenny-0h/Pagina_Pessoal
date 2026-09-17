/**
 * Página Pessoal — W3.CSS
 * JavaScript:
 * 1. Suporte a 3 Temas (Claro, Escuro e Marrom Suave) com alternância sequencial.
 * 2. Preenchimento e controle dinâmico do modal W3.CSS de projetos.
 * 3. Controle do menu lateral (Sidebar) e overlay no ambiente mobile.
 */

const THEMES = [{id: "light", name: "Tema claro", icon: "☀️"}, {
    id: "dark",
    name: "Tema escuro",
    icon: "🌙"
}, {id: "warm", name: "Tema marrom", icon: "☕"}];

const STORAGE_KEY = "personal-page-theme";
const DEFAULT_THEME = "light";

/* ---------------------------------------------------------
   GERENCIAMENTO DE TEMAS
   --------------------------------------------------------- */
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

/* ---------------------------------------------------------
   CONTROLE DO SIDEBAR MOBILE
   --------------------------------------------------------- */
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.style.display = "block";
    if (overlay) overlay.style.display = "block";
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar && window.innerWidth <= 992) sidebar.style.display = "none";
    if (overlay) overlay.style.display = "none";
}

function setupSidebarControls() {
    const menuBtn = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("sidebarClose");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebarLinks = document.querySelectorAll("#sidebar .nav-link");

    if (menuBtn) menuBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 992) {
                closeSidebar();
            }
        });
    });
}

/* ---------------------------------------------------------
   MODAL DE PROJETOS (W3.CSS)
   --------------------------------------------------------- */
function setupProjectModal() {
    const modal = document.getElementById("projectModal");
    const modalCloseBtn = document.getElementById("modalClose");
    const projectCards = document.querySelectorAll(".project-card");

    if (!modal) return;

    function openProjectModal(card) {
        document.getElementById("projectModalLabel").textContent = card.dataset.projectTitle || "Projeto";

        document.getElementById("projectModalTech").textContent = card.dataset.projectTech || "";

        document.getElementById("projectModalSummary").textContent = card.dataset.projectSummary || "";

        document.getElementById("projectModalLink").href = card.dataset.projectLink || "#";

        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    projectCards.forEach((card) => {
        card.addEventListener("click", () => openProjectModal(card));
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeModal);
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();

    document.querySelectorAll("#themeToggle, #themeToggleMobile")
        .forEach((button) => button.addEventListener("click", toggleTheme));

    setupSidebarControls();
    setupProjectModal();
});