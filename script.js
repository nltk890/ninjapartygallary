const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalInfo = document.getElementById('modalInfo');
const closeModal = document.getElementsByClassName('close')[0];
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

async function loadImages() {
    try {
        // Try to load the images.json file
        const response = await fetch('images/images.json');

        const imageList = [
            "image_offer_dragon_warrior #81017.png",
            "image_offer_shadow_ninja #81028.png",
            "preview_skin_AgentSpace_m_G1 #81451.png",
            "preview_skin_AgentSpace_m_G6 #81396.png",
            "preview_skin_AlienSpacesuit_m_G1 #81482.png",
            "preview_skin_AlienSpacesuit_m_G6.png",
            "preview_skin_Arn_Lynx_m_G1 #81335.png",
            "preview_skin_BoxerPro_m_G1 #81391.png",
            "preview_skin_BoxerPro_m_G6 #81258.png",
            "preview_skin_Boy_m_G1.png",
            "preview_skin_Boy_m_G6 #81499.png",
            "preview_skin_Builder_m_G1.png",
            "preview_skin_Builder_m_G6.png",
            "preview_skin_CatEvil_m_G1 #81202.png",
            "preview_skin_CatEvil_m_G6 #81222.png",
            "preview_skin_ChefSushi_m_G1 #81311.png",
            "preview_skin_ChefSushi_m_G6.png",
            "preview_skin_Cosmonaut_m_G1 #81200.png",
            "preview_skin_Cosmonaut_m_G1.png",
            "preview_skin_Cosmonaut_m_G6 #81136.png",
            "preview_skin_Cosmonaut_w_G1 #81320.png",
            "preview_skin_Cosmonaut_w_G1.png",
            "preview_skin_Cosmonaut_w_G6 #81382.png",
            "preview_skin_Dragon_Warrior_m_G1 #81495.png",
            "preview_skin_Dragon_Warrior_m_G6.png",
            "preview_skin_HackerTech_m_G1.png",
            "preview_skin_HackerTech_m_G6.png",
            "preview_skin_HackerTech_w_G1.png",
            "preview_skin_HackerTech_w_G6.png",
            "preview_skin_MainBoy_m_G1 #81304.png",
            "preview_skin_MainBoy_m_G6 #81373.png",
            "preview_skin_MainGirl_w_G1 #81216.png",
            "preview_skin_MainGirl_w_G6 #81093.png",
            "preview_skin_Ninja_Assassin_m_G1 #81350.png",
            "preview_skin_Ninja_Assassin_m_G6 #81410.png",
            "preview_skin_Ninja_BlackArmor_m_G1 #81347.png",
            "preview_skin_Ninja_BlackArmor_m_G6.png",
            "preview_skin_Ninja_Black_m_G1.png",
            "preview_skin_Ninja_Black_m_G6 #81421.png",
            "preview_skin_Ninja_Blue_w_G1.png",
            "preview_skin_Ninja_Blue_w_G6.png",
            "preview_skin_Ninja_Elite_m_G1.png",
            "preview_skin_Ninja_Elite_m_G6 #81512.png",
            "preview_skin_Ninja_Elite_w_G1.png",
            "preview_skin_Ninja_Elite_w_G6.png",
            "preview_skin_Ninja_Green_m_G1 #81309.png",
            "preview_skin_Ninja_Green_m_G6.png",
            "preview_skin_Ninja_Red_m_G1.png",
            "preview_skin_Ninja_Red_m_G6 #81361.png",
            "preview_skin_Ninja_Shadow_m_G1.png",
            "preview_skin_Ninja_Shadow_m_G6.png",
            "preview_skin_Ninja_Urban_m_G1.png",
            "preview_skin_Ninja_Urban_m_G6.png",
            "preview_skin_Ninja_White_w_G1.png",
            "preview_skin_Ninja_White_w_G6.png",
            "preview_skin_Ninja_Yakudza_m_G1.png",
            "preview_skin_Ninja_Yakudza_m_G6.png",
            "preview_skin_Office_m_G1.png",
            "preview_skin_Office_m_G6 #81496.png",
            "preview_skin_Plumber_m_G1.png",
            "preview_skin_Plumber_m_G6.png",
            "preview_skin_Robot_Space_m_G1 #81250.png",
            "preview_skin_Robot_Space_m_G6.png",
            "preview_skin_Samurai_Mech_m_G1.png",
            "preview_skin_Samurai_Mech_m_G6.png",
            "preview_skin_ScientistCrazy_m_G1 #81372.png",
            "preview_skin_ScientistCrazy_m_G6 #81366.png",
            "preview_skin_Sf2_May_w_G1.png",
            "preview_skin_Sf3_Itu_m_G1.png",
            "preview_skin_Sf3_Kibo_w_G1.png",
            "preview_skin_Snat_m_G1 #81310.png",
            "preview_skin_Snat_m_G6.png",
            "preview_skin_Spn_Redline_w_G1 #81471.png",
            "preview_skin_Vct_Hunter_m_G1 #81498.png",
            "preview_skin_Vct_Main_m_G1 #81485.png"
        ];

        if (!Array.isArray(imageList) || imageList.length === 0) {
            throw new Error('Images.json should contain an array of image filenames');
        }

        loading.style.display = 'none';

        // Load each image
        for (const filename of imageList) {
            await createImageCard(filename);
        }

        // Hide instructions after successful load
        document.querySelector('.instructions').style.display = 'none';

    } catch (error) {
        loading.style.display = 'none';
        errorDiv.innerHTML = error.message.replace(/\n/g, '<br>');
        errorDiv.style.display = 'block';
        console.error('Error loading images:', error);
    }
}

async function createImageCard(filename) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = function () {
            const card = document.createElement('div');
            card.className = 'image-card';

            // Clean filename for display (remove extension)
            const displayName = filename.replace(/\.[^/.]+$/, "");

            card.innerHTML = `
                        <div class="image-container">
                            <img src="images/${filename}" alt="${displayName}" class="gallery-image">
                        </div>
                        <div class="image-info">
                            <div class="image-name">${displayName}</div>
                            <div class="image-size">${this.naturalWidth} × ${this.naturalHeight}</div>
                        </div>
                    `;

            // Add click event for modal
            const cardImg = card.querySelector('.gallery-image');
            cardImg.addEventListener('click', () => openModal(filename, displayName, this.naturalWidth, this.naturalHeight));

            gallery.appendChild(card);

            // Add animation
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';

                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 10);

            resolve();
        };

        img.onerror = function () {
            console.warn(`Failed to load image: ${filename}`);
            resolve();
        };

        img.src = `images/${filename}`;
    });
}

function openModal(filename, displayName, width, height) {
    modal.style.display = 'block';
    modalImg.src = `images/${filename}`;
    modalInfo.innerHTML = `
                <strong>${displayName}</strong><br>
                ${width} × ${height} pixels
            `;
}

// Modal event listeners
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});

// Start loading images when page loads
document.addEventListener('DOMContentLoaded', loadImages);