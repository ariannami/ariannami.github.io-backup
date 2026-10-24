/**
 * Arian Nami | Minimalist Interactive Hover List Portfolio + GSAP StaggeredMenu
 * Vanilla JS: StaggeredMenu Initialization + Hover Image Swap
 */
import StaggeredMenu from "./StaggeredMenu.js";

export const MENU_ITEMS = [
    {
        id: "home",
        number: "01",
        label: "Home",
        ariaLabel: "Go to home page",
        link: "./index.html",
    },
    {
        id: "about",
        number: "02",
        label: "About",
        ariaLabel: "Learn about us",
        link: "./about.html",
    },
    {
        id: "services",
        number: "03",
        label: "Services",
        ariaLabel: "View our services",
        link: "/services",
    },
    {
        id: "projects",
        number: "04",
        label: "Projects",
        ariaLabel: "View projects",
        link: "./projects.html",
    },
    {
        id: "awards",
        number: "05",
        label: "Awards",
        ariaLabel: "View awards and recognition",
        link: "/awards",
    },
];

export const SOCIAL_ITEMS = [
    { label: "LinkedIn", link: "https://linkedin.com" },
    { label: "Instagram", link: "https://instagram.com" },
    { label: "Behance", link: "https://behance.net" },
];

export const PROJECT_DETAILS = {
    agri: {
        id: "agri",
        link: "./agrivision.html",
        image: "/assets/aistudio/Untitled1_da706d99.jpg",
        category: "Hardware & Product",
        title: "AGRIVISION",
        description:
            "Professional agricultural drone ecosystem featuring an autonomous quadrotor and ruggedized 500W solar-assisted mobile docking station with integrated battery telemetry and field kit storage.",
    },
    wheelchair: {
        id: "wheelchair",
        image: "/renders/ergonomic-wheelchair.svg",
        category: "Hardware & Product",
        title: "Ergonomic Wheelchair",
        description:
            "Ultra-lightweight daily mobility frame combining hydroformed titanium tubing with a tensioned breathable seat shell and tri-spoke carbon camber wheels.",
    },
    rfid: {
        id: "rfid",
        image: "/renders/rfid-first-aid-kit.svg",
        category: "Industrial Design",
        title: "RFID First Aid Kit",
        description:
            "IP67-rated emergency medical enclosure with integrated passive RFID inventory tracking, anodized twin-stage latches, and high-visibility telemetry ring.",
    },
    survival: {
        id: "survival",
        image: "/renders/post-apocalyptic-gear.svg",
        category: "Concept Art",
        title: "Survival Gear",
        description:
            "Hard-surface concept design for an asymmetric dual-optic reconnaissance helmet and modular respirator rig, balancing weathered ballistic materials with brass optics.",
    },
};

export const STUDIO_SECTIONS = {
    about: {
        category: "Studio Profile",
        title: "About Arian Nami",
        image: "/assets/aistudio/Untitled1_da706d99.jpg",
        description:
            "Industrial Designer & 3D Visualization Specialist focused on hardware products, medical devices, robotics enclosures, and atmospheric architectural spaces engineered for real-world manufacturing.",
    },
    services: {
        category: "Capabilities",
        title: "Industrial Design & 3D Services",
        image: "/renders/rfid-first-aid-kit.svg",
        description:
            "End-to-end CAD surfacing (SolidWorks, Rhinoceros 3D), Design for Manufacturing (DFM), hard-surface concept modeling, and photorealistic studio rendering (KeyShot, Octane, Corona).",
    },
    contact: {
        category: "Direct Commissions",
        title: "hello@ariannami.com",
        image: "/renders/architectural-space.svg",
        description:
            "Available for freelance industrial design, product visualization, and concept art commissions worldwide. Reach out directly via hello@ariannami.com.",
    },
    awards: {
        category: "Recognition & Honors",
        title: "Selected Design Awards",
        image: "/assets/aistudio/Untitled1_da706d99.jpg",
        description:
            "Recognized for excellence in industrial hardware ergonomics, autonomous agricultural mobility ecosystems, and photorealistic 3D product visualization.",
    },
};

/**
 * Pure helper: looks up project metadata by key
 * @param {string} key
 */
export function getProjectById(key) {
    return PROJECT_DETAILS[key] || PROJECT_DETAILS.agri;
}

export function initPortfolioIndex() {
    if (typeof document === "undefined") return;

    const bgReveal = /** @type {HTMLImageElement | null} */ (
        document.getElementById("bg-reveal")
    );
    const projectItems = Array.from(
        document.querySelectorAll(".project-item")
    );

    const dialogEl = /** @type {HTMLDialogElement | null} */ (
        document.getElementById("project-dialog")
    );
    const dialogCloseBtn = document.getElementById("dialog-close");
    const dialogCategory = document.getElementById("dialog-project-category");
    const dialogImg = /** @type {HTMLImageElement | null} */ (
        document.getElementById("dialog-project-img")
    );
    const dialogTitle = document.getElementById("dialog-project-title");
    const dialogDesc = document.getElementById("dialog-project-desc");

    // Instantiate GSAP-powered StaggeredMenu with portfolio dark theme & #FF9900 accent
    const staggeredMenu = new StaggeredMenu({
        position: "right",
        items: MENU_ITEMS,
        socialItems: SOCIAL_ITEMS,
        displaySocials: true,
        displayItemNumbering: true,
        menuButtonColor: "#ffffff",
        openMenuButtonColor: "#FF9900",
        changeMenuColorOnOpen: true,
        colors: ["#FF9900", "#1F1F24"],
        accentColor: "#FF9900",
        onItemClick: (item, event) => {
            if (
                item.id === "home" ||
                item.id === "about" ||
                item.id === "projects"
            ) {
                // Allow native navigation to ./index.html, ./about.html, or ./projects.html
                return;
            }

            event.preventDefault();
            staggeredMenu.close();

            const sectionData = STUDIO_SECTIONS[item.id];
            if (sectionData && dialogEl) {
                if (dialogCategory) {
                    dialogCategory.textContent = sectionData.category;
                }
                if (dialogTitle) {
                    dialogTitle.textContent = sectionData.title;
                }
                if (dialogImg) {
                    dialogImg.src = sectionData.image;
                }
                if (dialogDesc) {
                    dialogDesc.textContent = sectionData.description;
                }
                if (typeof dialogEl.showModal === "function") {
                    dialogEl.showModal();
                }
            }
        },
    });

    // Preload all project renders so hover swaps are instantaneous
    projectItems.forEach((item) => {
        const imgUrl = item.getAttribute("data-image");
        if (imgUrl) {
            const preload = new Image();
            preload.src = imgUrl;
        }
    });

    function swapBackgroundImage(imageUrl) {
        if (!bgReveal || !imageUrl) return;
        if (bgReveal.getAttribute("src") === imageUrl) return;

        bgReveal.classList.add("is-transitioning");
        bgReveal.setAttribute("src", imageUrl);
        window.setTimeout(() => {
            bgReveal.classList.remove("is-transitioning");
        }, 160);
    }

    // Hover & focus-within image swap logic on .project-item
    projectItems.forEach((item) => {
        const imageUrl = item.getAttribute("data-image");
        const projectKey = item.getAttribute("data-project-key") || "agri";
        const linkEl = item.querySelector(".project-name");

        const handleActivate = () => {
            projectItems.forEach((el) =>
                el.classList.toggle("is-active", el === item)
            );
            swapBackgroundImage(imageUrl);
        };

        item.addEventListener("mouseenter", handleActivate);
        item.addEventListener("focusin", handleActivate);

        if (linkEl) {
            linkEl.addEventListener("click", (event) => {
                const href = linkEl.getAttribute("href") || "";
                if (href && !href.startsWith("#")) {
                    // Allow native navigation to dedicated project page (e.g. ./agrivision.html)
                    return;
                }
                event.preventDefault();
                handleActivate();
                const details = getProjectById(projectKey);
                if (dialogCategory) {
                    dialogCategory.textContent = details.category;
                }
                if (dialogTitle) {
                    dialogTitle.textContent = details.title;
                }
                if (dialogImg) {
                    dialogImg.src = imageUrl || details.image;
                }
                if (dialogDesc) {
                    dialogDesc.textContent = details.description;
                }
                if (dialogEl && typeof dialogEl.showModal === "function") {
                    dialogEl.showModal();
                }
            });
        }
    });

    if (dialogCloseBtn && dialogEl) {
        dialogCloseBtn.addEventListener("click", () => dialogEl.close());
        dialogEl.addEventListener("click", (event) => {
            if (event.target === dialogEl) dialogEl.close();
        });
    }

    // dnbls.com style interactive WORK > EXPERIENCE showcase switcher
    const expItems = Array.from(document.querySelectorAll(".dn-exp-item"));
    const expCards = Array.from(document.querySelectorAll(".dn-exp-card"));
    const expCounter = document.getElementById("dn-exp-counter");
    const expFooterMeta = document.getElementById("dn-exp-footer-meta");
    const expBgImg = /** @type {HTMLImageElement | null} */ (
        document.getElementById("dn-exp-bg-img")
    );

    if (expItems.length > 0) {
        const totalStr = String(expItems.length).padStart(2, "0");
        expItems.forEach((item) => {
            const activateExp = () => {
                const idx = item.getAttribute("data-exp-index") || "01";
                const role = item.getAttribute("data-exp-role") || "";
                const img = item.getAttribute("data-exp-image") || "";
                const targetId = item.getAttribute("data-exp-target") || "";

                expItems.forEach((el) =>
                    el.classList.toggle("is-active", el === item)
                );
                expCards.forEach((card) =>
                    card.classList.toggle("is-active", card.id === targetId)
                );

                if (expCounter) {
                    expCounter.textContent = `${idx} / ${totalStr}`;
                }
                if (expFooterMeta && role) {
                    expFooterMeta.textContent = role;
                }
                if (expBgImg && img && expBgImg.getAttribute("src") !== img) {
                    expBgImg.setAttribute("src", img);
                }
            };

            item.addEventListener("mouseenter", activateExp);
            item.addEventListener("focus", activateExp);
            item.addEventListener("click", activateExp);
        });
    }
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPortfolioIndex);
    } else {
        initPortfolioIndex();
    }
}
