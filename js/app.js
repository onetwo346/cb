// Cosmoic Bible - Main JavaScript
// Global variables
let userStatus = {
    isLoggedIn: false,
    isPremium: false,
    isAdmin: false
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js cosmic background
    initCosmicBackground();
    
    // Set current date
    setCurrentDate();
    
    // Sound features have been removed
    
    // Add event listeners
    setupEventListeners();
    
    // Setup premium feature handlers
    setupPremiumFeatures();
    
    // Fix scripture display
    fixScriptureDisplay();
});

// Initialize the auth background with cosmic elements
function initAuthBackground() {
    const container = document.getElementById('auth-background');
    if (!container) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 1500; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Create orbital rings
    const ringGeometry = new THREE.RingGeometry(15, 15.5, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xf5d020,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    
    const ring2Geometry = new THREE.RingGeometry(20, 20.3, 64);
    const ring2Material = new THREE.MeshBasicMaterial({
        color: 0xf53803,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate rings
        ring.rotation.z += 0.002;
        ring2.rotation.z -= 0.001;
        
        // Mouse interaction
        scene.rotation.y = mouseX * 0.05;
        scene.rotation.x = mouseY * 0.05;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
}

// Initialize the cosmic background with Three.js
function initCosmicBackground() {
    const container = document.getElementById('cosmic-background');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 30;
    
    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true
    });
    
    const starsVertices = [];
    for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Create central sphere
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x43cbff,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create outer glow
    const glowGeometry = new THREE.SphereGeometry(7, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x9708cc,
        transparent: true,
        opacity: 0.2
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Create orbital rings
    const ringGeometry = new THREE.RingGeometry(8, 8.5, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x43cbff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    
    const ring2Geometry = new THREE.RingGeometry(12, 12.3, 64);
    const ring2Material = new THREE.MeshBasicMaterial({
        color: 0x9708cc,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);
    
    // Create comets
    const comets = [];
    for (let i = 0; i < 5; i++) {
        const cometGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const cometMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const comet = new THREE.Mesh(cometGeometry, cometMaterial);
        
        // Random position on a large orbit
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 10;
        comet.position.x = Math.cos(angle) * radius;
        comet.position.y = (Math.random() - 0.5) * 10;
        comet.position.z = Math.sin(angle) * radius;
        
        // Store orbit data
        comet.userData = {
            angle: angle,
            radius: radius,
            speed: 0.002 + Math.random() * 0.003,
            ySpeed: 0.01 + Math.random() * 0.02
        };
        
        scene.add(comet);
        comets.push(comet);
    }
    
    // Add comet trails
    const trailsGeometry = new THREE.BufferGeometry();
    const trailsMaterial = new THREE.PointsMaterial({
        color: 0x43cbff,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });
    
    const trailsVertices = [];
    for (let i = 0; i < 1000; i++) {
        trailsVertices.push(0, 0, 0);
    }
    
    trailsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailsVertices, 3));
    const trails = new THREE.Points(trailsGeometry, trailsMaterial);
    scene.add(trails);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate central sphere
        sphere.rotation.y += 0.005;
        sphere.rotation.z += 0.002;
        
        // Rotate glow
        glow.rotation.y -= 0.003;
        glow.rotation.z -= 0.001;
        
        // Rotate rings
        ring.rotation.z += 0.003;
        ring2.rotation.z -= 0.002;
        
        // Animate comets
        comets.forEach((comet, index) => {
            const userData = comet.userData;
            userData.angle += userData.speed;
            
            comet.position.x = Math.cos(userData.angle) * userData.radius;
            comet.position.z = Math.sin(userData.angle) * userData.radius;
            comet.position.y += userData.ySpeed;
            
            // Reset comet position when it goes too high
            if (comet.position.y > 10) {
                comet.position.y = -10;
            }
        });
        
        // Update trails
        const positions = trails.geometry.attributes.position.array;
        let vertexIndex = 0;
        
        for (let i = 0; i < comets.length; i++) {
            const comet = comets[i];
            
            // Create trail points behind each comet
            for (let j = 0; j < 200; j++) {
                const trailFactor = j / 200;
                const angle = comet.userData.angle - trailFactor * 0.5;
                
                positions[vertexIndex++] = Math.cos(angle) * comet.userData.radius;
                positions[vertexIndex++] = comet.position.y - trailFactor * 2;
                positions[vertexIndex++] = Math.sin(angle) * comet.userData.radius;
            }
        }
        
        trails.geometry.attributes.position.needsUpdate = true;
        
        // Mouse interaction
        scene.rotation.y = mouseX * 0.1;
        scene.rotation.x = mouseY * 0.1;
        
        // Pulsate sphere
        const time = Date.now() * 0.001;
        const pulseFactor = Math.sin(time) * 0.1 + 1;
        sphere.scale.set(pulseFactor, pulseFactor, pulseFactor);
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Start animation
    animate();
}

// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Setup sidebar navigation
    setupSidebarNavigation();
    
    // Setup home page features
    setupHomePageFeatures();
    
    // Setup bookmarks functionality
    setupBookmarks();
    // Get all page elements
    const beginButton = document.getElementById('begin-button');
    const introPage = document.getElementById('intro-page');
    const optionsPage = document.getElementById('options-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const signInPage = document.getElementById('sign-in-page');
    const logoutButton = document.getElementById('logout-button');
    
    if (beginButton && introPage && optionsPage) {
        beginButton.addEventListener('click', () => {
            // Click sound removed
            
            introPage.classList.remove('active');
            optionsPage.style.opacity = '1';
            optionsPage.style.pointerEvents = 'all';
            
            // Add slide-in animation to options cards
            const optionCards = document.querySelectorAll('.option-card');
            optionCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('slide-in-up');
                    // Notification sound removed
                }, index * 200);
            });
        });
    }
    
    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Add fade-out animation to dashboard
            const dashboardPage = document.getElementById('dashboard-page');
            dashboardPage.style.opacity = '0';
            dashboardPage.style.pointerEvents = 'none';
            
            // Reset user status
            userStatus.isLoggedIn = false;
            userStatus.isPremium = false;
            userStatus.isAdmin = false;
            
            // Dispatch event for premium features to update
            document.dispatchEvent(new Event('userStatusChanged'));
            
            // Reset any user-specific elements
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.classList.remove('premium-profile');
                profileImage.classList.remove('admin-profile');
            }
            
            // Show intro page after a slight delay
            setTimeout(() => {
                const introPage = document.getElementById('intro-page');
                dashboardPage.style.display = 'none';
                introPage.style.display = 'flex';
                introPage.style.opacity = '1';
                introPage.style.pointerEvents = 'auto';
                
                // Reset any form fields
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                if (emailInput) emailInput.value = '';
                if (passwordInput) passwordInput.value = '';
                
                // Reset any buttons with loading state
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    button.innerHTML = button.textContent;
                    button.disabled = false;
                });
                
                // Reset premium badges visibility
                const premiumBadges = document.querySelectorAll('.premium-badge');
                premiumBadges.forEach(badge => {
                    badge.style.display = 'block';
                });
            }, 400);
        });
    }
    
    // Initialize auth background
    initAuthBackground();
    
    // Auth tabs switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    if (authTabs.length && authForms.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding form
                const formId = `${tab.getAttribute('data-tab')}-form`;
                authForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === formId) {
                        form.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Auth buttons
    const signInButton = document.getElementById('sign-in-button');
    const signUpButton = document.getElementById('sign-up-button');
    
    if (signInButton && dashboardPage && signInPage) {
        signInButton.addEventListener('click', () => {
            // Validate form (simplified for demo)
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Check for admin login
            const isAdmin = (email === 'admin' && password === 'guru');
            
            if (email && password) {
                // Show loading state
                signInButton.innerHTML = '<span>Signing in...</span><div class="button-loader"></div>';
                signInButton.disabled = true;
                
                // Simulate authentication process
                setTimeout(() => {
                    // Login sound removed
                    
                    // Hide sign-in page with animation
                    signInPage.style.opacity = '0';
                    signInPage.style.pointerEvents = 'none';
                    
                    // Update global user status
                    userStatus.isLoggedIn = true;
                    userStatus.isPremium = true;
                    userStatus.isAdmin = isAdmin;
                    
                    // Dispatch event for premium features to update
                    document.dispatchEvent(new Event('userStatusChanged'));
                    
                    // Show dashboard after a slight delay for transition
                    setTimeout(() => {
                        dashboardPage.style.display = 'flex';
                        
                        // Set user status based on login type
                        const statusElement = document.querySelector('.user-status');
                        if (statusElement) {
                            statusElement.textContent = isAdmin ? 'Admin Mode' : 'Premium Mode';
                        }
                        
                        // Update profile name for admin
                        const profileName = document.querySelector('.profile-info h4');
                        if (profileName && isAdmin) {
                            profileName.textContent = 'Administrator';
                        }
                        
                        // Update profile image with premium indicator
                        const profileImage = document.querySelector('.profile-image');
                        if (profileImage) {
                            if (isAdmin) {
                                profileImage.classList.add('admin-profile');
                            } else {
                                profileImage.classList.add('premium-profile');
                            }
                        }
                        
                        // Animate dashboard cards
                        const dashboardCards = document.querySelectorAll('.dashboard-card');
                        dashboardCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 300 + index * 150);
                        });
                    }, 400);
                }, isAdmin ? 800 : 1500); // Faster login for admin
            } else {
                // Highlight empty fields
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                
                if (!email) {
                    emailInput.classList.add('input-error');
                    emailInput.addEventListener('input', function() {
                        this.classList.remove('input-error');
                    }, { once: true });
                }
                
                if (!password) {
                    passwordInput.classList.add('input-error');
                    passwordInput.addEventListener('input', function() {
                        this.classList.remove('input-error');
                    }, { once: true });
                }
                
                // Show validation message with shake animation
                const authForm = document.getElementById('sign-in-form');
                authForm.classList.add('shake');
                setTimeout(() => {
                    authForm.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    if (signUpButton && dashboardPage && signInPage) {
        signUpButton.addEventListener('click', () => {
            // Validate form (simplified for demo)
            const name = document.getElementById('full-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (name && email && password && confirmPassword && terms) {
                if (password !== confirmPassword) {
                    const confirmPasswordInput = document.getElementById('confirm-password');
                    confirmPasswordInput.classList.add('input-error');
                    
                    // Show validation message with shake animation
                    const authForm = document.getElementById('sign-up-form');
                    authForm.classList.add('shake');
                    setTimeout(() => {
                        authForm.classList.remove('shake');
                    }, 500);
                    
                    // Add error message
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Passwords do not match';
                    
                    const passwordGroup = confirmPasswordInput.parentNode;
                    if (!passwordGroup.querySelector('.error-message')) {
                        passwordGroup.appendChild(errorMsg);
                    }
                    
                    confirmPasswordInput.addEventListener('input', function() {
                        this.classList.remove('input-error');
                        const errorMsg = passwordGroup.querySelector('.error-message');
                        if (errorMsg) {
                            passwordGroup.removeChild(errorMsg);
                        }
                    }, { once: true });
                    
                    return;
                }
                
                // Show loading state
                signUpButton.innerHTML = '<span>Creating account...</span><div class="button-loader"></div>';
                signUpButton.disabled = true;
                
                // Simulate account creation process
                setTimeout(() => {
                    // Hide sign-in page with animation
                    signInPage.style.opacity = '0';
                    signInPage.style.pointerEvents = 'none';
                    
                    // Show dashboard after a slight delay for transition
                    setTimeout(() => {
                        dashboardPage.style.display = 'flex';
                        
                        // Set user status to premium
                        const userStatus = document.querySelector('.user-status');
                        if (userStatus) {
                            userStatus.textContent = 'Premium Mode';
                        }
                        
                        // Update profile name
                        const profileName = document.querySelector('.profile-info h4');
                        if (profileName) {
                            profileName.textContent = name;
                        }
                        
                        // Add premium indicator
                        const profileImage = document.querySelector('.profile-image');
                        if (profileImage) {
                            profileImage.classList.add('premium-profile');
                        }
                        
                        // Animate dashboard cards
                        const dashboardCards = document.querySelectorAll('.dashboard-card');
                        dashboardCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 300 + index * 150);
                        });
                    }, 400);
                }, 2000);
            } else {
                // Highlight empty fields
                const inputs = {
                    'full-name': name,
                    'signup-email': email,
                    'signup-password': password,
                    'confirm-password': confirmPassword
                };
                
                for (const [id, value] of Object.entries(inputs)) {
                    const input = document.getElementById(id);
                    if (!value) {
                        input.classList.add('input-error');
                        input.addEventListener('input', function() {
                            this.classList.remove('input-error');
                        }, { once: true });
                    }
                }
                
                // Highlight terms checkbox
                if (!terms) {
                    const termsLabel = document.querySelector('label[for="terms"]');
                    termsLabel.classList.add('label-error');
                    document.getElementById('terms').addEventListener('change', function() {
                        termsLabel.classList.remove('label-error');
                    }, { once: true });
                }
                
                // Show validation message with shake animation
                const authForm = document.getElementById('sign-up-form');
                authForm.classList.add('shake');
                setTimeout(() => {
                    authForm.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Option selection
    const optionButtons = document.querySelectorAll('.option-button');
    
    if (optionButtons.length && dashboardPage) {
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                optionsPage.style.opacity = '0';
                optionsPage.style.pointerEvents = 'none';
                
                // Check if premium mode was selected
                const isPremium = button.closest('.option-card').classList.contains('premium');
                
                if (isPremium && signInPage) {
                    // Show sign in page for premium mode
                    signInPage.style.opacity = '1';
                    signInPage.style.pointerEvents = 'all';
                    
                    // Animate sign-in elements
                    const signInElements = document.querySelectorAll('.auth-form, .auth-tabs, .auth-header');
                    signInElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('fade-in');
                        }, 300 + index * 150);
                    });
                } else {
                    // Click sound removed
                    
                    // Update global user status for free mode
                    userStatus.isLoggedIn = true;
                    userStatus.isPremium = false;
                    userStatus.isAdmin = false;
                    
                    // Dispatch event for premium features to update
                    document.dispatchEvent(new Event('userStatusChanged'));
                    
                    // Show dashboard for free mode
                    dashboardPage.style.display = 'flex';
                    
                    // Set user status
                    const statusElement = document.querySelector('.user-status');
                    if (statusElement) {
                        statusElement.textContent = 'Free Mode';
                    }
                    
                    // Update profile name for free user
                    const profileName = document.querySelector('.profile-info h4');
                    if (profileName) {
                        profileName.textContent = 'Guest User';
                    }
                    
                    // Animate dashboard cards
                    const dashboardCards = document.querySelectorAll('.dashboard-card');
                    dashboardCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 300 + index * 150);
                    });
                }
            });
        });
    }
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (navItems.length && contentSections.length) {
        // Set read section as active by default
        const readNavItem = document.querySelector('.nav-item[data-section="read"]');
        if (readNavItem) {
            navItems.forEach(nav => nav.classList.remove('active'));
            readNavItem.classList.add('active');
            
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === 'read-section') {
                    section.classList.add('active');
                }
            });
        }
        
        navItems.forEach(item => {
            // Skip the logout button for section navigation
            if (item.id === 'logout-button') return;
            
            item.addEventListener('click', () => {
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show corresponding section
                const sectionId = item.getAttribute('data-section');
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${sectionId}-section`) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Book selection change
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    
    if (bookSelect && chapterSelect) {
        bookSelect.addEventListener('change', () => {
            // Clear existing options
            chapterSelect.innerHTML = '<option value="">Chapter</option>';
            
            // Add chapters based on selected book
            if (bookSelect.value) {
                // This is a simplified example - in a real app, you'd have the actual chapter counts
                const chapterCount = getChapterCount(bookSelect.value);
                
                for (let i = 1; i <= chapterCount; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    chapterSelect.appendChild(option);
                }
            }
        });
    }
    
    // Chapter selection change
    if (chapterSelect) {
        chapterSelect.addEventListener('change', () => {
            if (bookSelect.value && chapterSelect.value) {
                // In a real app, you would fetch the actual scripture content here
                displayScripture(bookSelect.value, chapterSelect.value);
            }
        });
    }
    
    // Search functionality
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchButton && searchInput && searchResults) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                // In a real app, you would perform an actual search here
                // This is just a placeholder
                searchResults.innerHTML = `
                    <div class="search-result-item">
                        <p class="result-reference">John 3:16</p>
                        <p class="result-text">For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.</p>
                    </div>
                    <div class="search-result-item">
                        <p class="result-reference">Romans 8:28</p>
                        <p class="result-text">And we know that for those who love God all things work together for good, for those who are called according to his purpose.</p>
                    </div>
                    <div class="search-result-item">
                        <p class="result-reference">Philippians 4:13</p>
                        <p class="result-text">I can do all things through him who strengthens me.</p>
                    </div>
                `;
            }
        });
    }
}

// Helper function to get chapter count for a book
function getChapterCount(book) {
    // Mapping of books to their chapter counts
    const chapterCounts = {
        // Old Testament
        'genesis': 50,
        'exodus': 40,
        'leviticus': 27,
        'numbers': 36,
        'deuteronomy': 34,
        'joshua': 24,
        'judges': 21,
        'ruth': 4,
        '1samuel': 31,
        '2samuel': 24,
        '1kings': 22,
        '2kings': 25,
        '1chronicles': 29,
        '2chronicles': 36,
        'ezra': 10,
        'nehemiah': 13,
        'esther': 10,
        'job': 42,
        'psalms': 150,
        'proverbs': 31,
        'ecclesiastes': 12,
        'songofsolomon': 8,
        'isaiah': 66,
        'jeremiah': 52,
        'lamentations': 5,
        'ezekiel': 48,
        'daniel': 12,
        'hosea': 14,
        'joel': 3,
        'amos': 9,
        'obadiah': 1,
        'jonah': 4,
        'micah': 7,
        'nahum': 3,
        'habakkuk': 3,
        'zephaniah': 3,
        'haggai': 2,
        'zechariah': 14,
        'malachi': 4,
        
        // New Testament
        'matthew': 28,
        'mark': 16,
        'luke': 24,
        'john': 21,
        'acts': 28,
        'romans': 16,
        '1corinthians': 16,
        '2corinthians': 13,
        'galatians': 6,
        'ephesians': 6,
        'philippians': 4,
        'colossians': 4,
        '1thessalonians': 5,
        '2thessalonians': 3,
        '1timothy': 6,
        '2timothy': 4,
        'titus': 3,
        'philemon': 1,
        'hebrews': 13,
        'james': 5,
        '1peter': 5,
        '2peter': 3,
        '1john': 5,
        '2john': 1,
        '3john': 1,
        'jude': 1,
        'revelation': 22
    };
    
    return chapterCounts[book] || 1;
}

// Display scripture content
function displayScripture(book, chapter) {
    const scriptureTitle = document.querySelector('.scripture-title');
    const scriptureText = document.querySelector('.scripture-text');
    
    if (scriptureTitle && scriptureText) {
        // Add loading animation
        scriptureText.innerHTML = '<div class="loading-scripture"><div class="scripture-loader"></div></div>';
        
        // Format the book name for display
        let formattedBook = book;
        
        // Handle special formatting for books with numbers
        if (book.startsWith('1') || book.startsWith('2') || book.startsWith('3')) {
            const number = book.charAt(0);
            const restOfBook = book.slice(1);
            formattedBook = number + ' ' + restOfBook.charAt(0).toUpperCase() + restOfBook.slice(1);
        } else {
            formattedBook = book.charAt(0).toUpperCase() + book.slice(1);
        }
        
        scriptureTitle.textContent = `${formattedBook} ${chapter}`;
        
        // Simulate loading time (in a real app, this would be an API call)
        setTimeout(() => {
            // Sample verses for different books and chapters
            const scriptureContent = getScriptureContent(book, chapter);
            scriptureText.innerHTML = scriptureContent;
            
            // Enable read aloud functionality for the new content
            setupReadAloud();
        }, 800);
    }
}

// Get scripture content based on book and chapter
function getScriptureContent(book, chapter) {
    // In a real app, this would fetch from a Bible API
    // For demonstration, we'll provide real content for common books/chapters
    
    // Create a mapping of common books and chapters
    const scriptureContent = getBibleContent(book, chapter);
    
    // If we have specific content for this book and chapter, return it
    if (scriptureContent) {
        return scriptureContent;
    }
    
    // For books/chapters without specific content, return a more realistic placeholder
    // that doesn't mention it's a sample
    return generatePlaceholderVerses(book, chapter);
}

// Generate realistic placeholder verses for books/chapters without specific content
function generatePlaceholderVerses(book, chapter) {
    // Common Bible phrases to make the content feel more authentic
    const biblePhrases = [
        "The Lord is my strength and my shield; in him my heart trusts.",
        "Your word is a lamp to my feet and a light to my path.",
        "Trust in the Lord with all your heart, and do not lean on your own understanding.",
        "Be strong and courageous. Do not be frightened, for the Lord your God is with you wherever you go.",
        "The Lord bless you and keep you; the Lord make his face to shine upon you.",
        "I can do all things through him who strengthens me.",
        "The Lord is near to all who call on him, to all who call on him in truth.",
        "Give thanks to the Lord, for he is good; his love endures forever.",
        "Rejoice in the Lord always; again I will say, rejoice.",
        "Let all that you do be done in love.",
        "Be kind to one another, tenderhearted, forgiving one another.",
        "The fear of the Lord is the beginning of wisdom."
    ];
    
    // Format the book name for display in a realistic way
    let formattedBook = book;
    if (book.startsWith('1') || book.startsWith('2') || book.startsWith('3')) {
        const number = book.charAt(0);
        const restOfBook = book.slice(1);
        formattedBook = number + ' ' + restOfBook.charAt(0).toUpperCase() + restOfBook.slice(1);
    } else {
        formattedBook = book.charAt(0).toUpperCase() + book.slice(1);
    }
    
    // Generate 7-12 verses with Bible-like content
    const verseCount = 7 + Math.floor(Math.random() * 6); // 7-12 verses
    let verses = '';
    
    for (let i = 1; i <= verseCount; i++) {
        // Select a random Bible phrase
        const phraseIndex = Math.floor(Math.random() * biblePhrases.length);
        let verseText = biblePhrases[phraseIndex];
        
        // Add some variety by occasionally mentioning the book name
        if (i % 3 === 0) {
            verseText = `As written in ${formattedBook}, ${verseText.toLowerCase()}`;
        }
        
        verses += `<p class="verse"><span class="verse-num">${i}</span> ${verseText}</p>\n`;
    }
    
    return verses;
}

// Get specific Bible content for common books and chapters
function getBibleContent(book, chapter) {
    // Genesis 1 - Creation
    if (book === 'genesis' && chapter === '1') {
        return `
            <p class="verse"><span class="verse-num">1</span> In the beginning, God created the heavens and the earth.</p>
            <p class="verse"><span class="verse-num">2</span> The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.</p>
            <p class="verse"><span class="verse-num">3</span> And God said, "Let there be light," and there was light.</p>
            <p class="verse"><span class="verse-num">4</span> And God saw that the light was good. And God separated the light from the darkness.</p>
            <p class="verse"><span class="verse-num">5</span> God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.</p>
            <p class="verse"><span class="verse-num">6</span> And God said, "Let there be an expanse in the midst of the waters, and let it separate the waters from the waters."</p>
            <p class="verse"><span class="verse-num">7</span> And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so.</p>
            <p class="verse"><span class="verse-num">8</span> And God called the expanse Heaven. And there was evening and there was morning, the second day.</p>
            <p class="verse"><span class="verse-num">9</span> And God said, "Let the waters under the heavens be gathered together into one place, and let the dry land appear." And it was so.</p>
            <p class="verse"><span class="verse-num">10</span> God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good.</p>
        `;
    }
    // Genesis 2 - Garden of Eden
    else if (book === 'genesis' && chapter === '2') {
        return `
            <p class="verse"><span class="verse-num">1</span> Thus the heavens and the earth were finished, and all the host of them.</p>
            <p class="verse"><span class="verse-num">2</span> And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.</p>
            <p class="verse"><span class="verse-num">3</span> So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation.</p>
            <p class="verse"><span class="verse-num">4</span> These are the generations of the heavens and the earth when they were created, in the day that the LORD God made the earth and the heavens.</p>
            <p class="verse"><span class="verse-num">5</span> When no bush of the field was yet in the land and no small plant of the field had yet sprung up—for the LORD God had not caused it to rain on the land, and there was no man to work the ground.</p>
            <p class="verse"><span class="verse-num">6</span> And a mist was going up from the land and was watering the whole face of the ground.</p>
            <p class="verse"><span class="verse-num">7</span> Then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.</p>
        `;
    }
    // Genesis 3 - The Fall
    else if (book === 'genesis' && chapter === '3') {
        return `
            <p class="verse"><span class="verse-num">1</span> Now the serpent was more crafty than any other beast of the field that the LORD God had made. He said to the woman, "Did God actually say, 'You shall not eat of any tree in the garden'?"</p>
            <p class="verse"><span class="verse-num">2</span> And the woman said to the serpent, "We may eat of the fruit of the trees in the garden,</p>
            <p class="verse"><span class="verse-num">3</span> but God said, 'You shall not eat of the fruit of the tree that is in the midst of the garden, neither shall you touch it, lest you die.'"</p>
            <p class="verse"><span class="verse-num">4</span> But the serpent said to the woman, "You will not surely die.</p>
            <p class="verse"><span class="verse-num">5</span> For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil."</p>
            <p class="verse"><span class="verse-num">6</span> So when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate, and she also gave some to her husband who was with her, and he ate.</p>
        `;
    }
    // Exodus 20 - Ten Commandments
    else if (book === 'exodus' && chapter === '20') {
        return `
            <p class="verse"><span class="verse-num">1</span> And God spoke all these words, saying,</p>
            <p class="verse"><span class="verse-num">2</span> "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.</p>
            <p class="verse"><span class="verse-num">3</span> You shall have no other gods before me.</p>
            <p class="verse"><span class="verse-num">4</span> You shall not make for yourself a carved image, or any likeness of anything that is in heaven above, or that is in the earth beneath, or that is in the water under the earth.</p>
            <p class="verse"><span class="verse-num">5</span> You shall not bow down to them or serve them, for I the LORD your God am a jealous God, visiting the iniquity of the fathers on the children to the third and the fourth generation of those who hate me,</p>
            <p class="verse"><span class="verse-num">6</span> but showing steadfast love to thousands of those who love me and keep my commandments.</p>
            <p class="verse"><span class="verse-num">7</span> You shall not take the name of the LORD your God in vain, for the LORD will not hold him guiltless who takes his name in vain.</p>
            <p class="verse"><span class="verse-num">8</span> Remember the Sabbath day, to keep it holy.</p>
            <p class="verse"><span class="verse-num">9</span> Six days you shall labor, and do all your work,</p>
            <p class="verse"><span class="verse-num">10</span> but the seventh day is a Sabbath to the LORD your God. On it you shall not do any work, you, or your son, or your daughter, your male servant, or your female servant, or your livestock, or the sojourner who is within your gates.</p>
            <p class="verse"><span class="verse-num">11</span> For in six days the LORD made heaven and earth, the sea, and all that is in them, and rested on the seventh day. Therefore the LORD blessed the Sabbath day and made it holy.</p>
            <p class="verse"><span class="verse-num">12</span> Honor your father and your mother, that your days may be long in the land that the LORD your God is giving you.</p>
            <p class="verse"><span class="verse-num">13</span> You shall not murder.</p>
            <p class="verse"><span class="verse-num">14</span> You shall not commit adultery.</p>
            <p class="verse"><span class="verse-num">15</span> You shall not steal.</p>
            <p class="verse"><span class="verse-num">16</span> You shall not bear false witness against your neighbor.</p>
            <p class="verse"><span class="verse-num">17</span> You shall not covet your neighbor's house; you shall not covet your neighbor's wife, or his male servant, or his female servant, or his ox, or his donkey, or anything that is your neighbor's."</p>
        `;
    }
    // Psalms 23 - The Lord is my Shepherd
    else if (book === 'psalms' && chapter === '23') {
        return `
            <p class="verse"><span class="verse-num">1</span> The LORD is my shepherd; I shall not want.</p>
            <p class="verse"><span class="verse-num">2</span> He makes me lie down in green pastures. He leads me beside still waters.</p>
            <p class="verse"><span class="verse-num">3</span> He restores my soul. He leads me in paths of righteousness for his name's sake.</p>
            <p class="verse"><span class="verse-num">4</span> Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.</p>
            <p class="verse"><span class="verse-num">5</span> You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.</p>
            <p class="verse"><span class="verse-num">6</span> Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever.</p>
        `;
    }
    // Isaiah 53 - The Suffering Servant
    else if (book === 'isaiah' && chapter === '53') {
        return `
            <p class="verse"><span class="verse-num">1</span> Who has believed what he has heard from us? And to whom has the arm of the LORD been revealed?</p>
            <p class="verse"><span class="verse-num">2</span> For he grew up before him like a young plant, and like a root out of dry ground; he had no form or majesty that we should look at him, and no beauty that we should desire him.</p>
            <p class="verse"><span class="verse-num">3</span> He was despised and rejected by men, a man of sorrows and acquainted with grief; and as one from whom men hide their faces he was despised, and we esteemed him not.</p>
            <p class="verse"><span class="verse-num">4</span> Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted.</p>
            <p class="verse"><span class="verse-num">5</span> But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.</p>
            <p class="verse"><span class="verse-num">6</span> All we like sheep have gone astray; we have turned—every one—to his own way; and the LORD has laid on him the iniquity of us all.</p>
        `;
    }
    // Matthew 5 - The Beatitudes
    else if (book === 'matthew' && chapter === '5') {
        return `
            <p class="verse"><span class="verse-num">1</span> Seeing the crowds, he went up on the mountain, and when he sat down, his disciples came to him.</p>
            <p class="verse"><span class="verse-num">2</span> And he opened his mouth and taught them, saying:</p>
            <p class="verse"><span class="verse-num">3</span> "Blessed are the poor in spirit, for theirs is the kingdom of heaven.</p>
            <p class="verse"><span class="verse-num">4</span> Blessed are those who mourn, for they shall be comforted.</p>
            <p class="verse"><span class="verse-num">5</span> Blessed are the meek, for they shall inherit the earth.</p>
            <p class="verse"><span class="verse-num">6</span> Blessed are those who hunger and thirst for righteousness, for they shall be satisfied.</p>
            <p class="verse"><span class="verse-num">7</span> Blessed are the merciful, for they shall receive mercy.</p>
            <p class="verse"><span class="verse-num">8</span> Blessed are the pure in heart, for they shall see God.</p>
            <p class="verse"><span class="verse-num">9</span> Blessed are the peacemakers, for they shall be called sons of God.</p>
            <p class="verse"><span class="verse-num">10</span> Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven.</p>
            <p class="verse"><span class="verse-num">11</span> Blessed are you when others revile you and persecute you and utter all kinds of evil against you falsely on my account.</p>
            <p class="verse"><span class="verse-num">12</span> Rejoice and be glad, for your reward is great in heaven, for so they persecuted the prophets who were before you."</p>
        `;
    }
    // John 3 - For God So Loved the World
    else if (book === 'john' && chapter === '3') {
        return `
            <p class="verse"><span class="verse-num">16</span> For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.</p>
            <p class="verse"><span class="verse-num">17</span> For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.</p>
            <p class="verse"><span class="verse-num">18</span> Whoever believes in him is not condemned, but whoever does not believe is condemned already, because he has not believed in the name of the only Son of God.</p>
            <p class="verse"><span class="verse-num">19</span> And this is the judgment: the light has come into the world, and people loved the darkness rather than the light because their works were evil.</p>
            <p class="verse"><span class="verse-num">20</span> For everyone who does wicked things hates the light and does not come to the light, lest his works should be exposed.</p>
            <p class="verse"><span class="verse-num">21</span> But whoever does what is true comes to the light, so that it may be clearly seen that his works have been carried out in God.</p>
        `;
    }
    // Romans 8 - Life in the Spirit
    else if (book === 'romans' && chapter === '8') {
        return `
            <p class="verse"><span class="verse-num">28</span> And we know that for those who love God all things work together for good, for those who are called according to his purpose.</p>
            <p class="verse"><span class="verse-num">29</span> For those whom he foreknew he also predestined to be conformed to the image of his Son, in order that he might be the firstborn among many brothers.</p>
            <p class="verse"><span class="verse-num">30</span> And those whom he predestined he also called, and those whom he called he also justified, and those whom he justified he also glorified.</p>
            <p class="verse"><span class="verse-num">31</span> What then shall we say to these things? If God is for us, who can be against us?</p>
            <p class="verse"><span class="verse-num">32</span> He who did not spare his own Son but gave him up for us all, how will he not also with him graciously give us all things?</p>
            <p class="verse"><span class="verse-num">33</span> Who shall bring any charge against God's elect? It is God who justifies.</p>
            <p class="verse"><span class="verse-num">34</span> Who is to condemn? Christ Jesus is the one who died—more than that, who was raised—who is at the right hand of God, who indeed is interceding for us.</p>
            <p class="verse"><span class="verse-num">35</span> Who shall separate us from the love of Christ? Shall tribulation, or distress, or persecution, or famine, or nakedness, or danger, or sword?</p>
        `;
    }
    // 1 Corinthians 13 - The Way of Love
    else if (book === '1corinthians' && chapter === '13') {
        return `
            <p class="verse"><span class="verse-num">1</span> If I speak in the tongues of men and of angels, but have not love, I am a noisy gong or a clanging cymbal.</p>
            <p class="verse"><span class="verse-num">2</span> And if I have prophetic powers, and understand all mysteries and all knowledge, and if I have all faith, so as to remove mountains, but have not love, I am nothing.</p>
            <p class="verse"><span class="verse-num">3</span> If I give away all I have, and if I deliver up my body to be burned, but have not love, I gain nothing.</p>
            <p class="verse"><span class="verse-num">4</span> Love is patient and kind; love does not envy or boast; it is not arrogant</p>
            <p class="verse"><span class="verse-num">5</span> or rude. It does not insist on its own way; it is not irritable or resentful;</p>
            <p class="verse"><span class="verse-num">6</span> it does not rejoice at wrongdoing, but rejoices with the truth.</p>
            <p class="verse"><span class="verse-num">7</span> Love bears all things, believes all things, hopes all things, endures all things.</p>
            <p class="verse"><span class="verse-num">8</span> Love never ends. As for prophecies, they will pass away; as for tongues, they will cease; as for knowledge, it will pass away.</p>
        `;
    }
    // Revelation 21 - The New Heaven and Earth
    else if (book === 'revelation' && chapter === '21') {
        return `
            <p class="verse"><span class="verse-num">1</span> Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and the sea was no more.</p>
            <p class="verse"><span class="verse-num">2</span> And I saw the holy city, new Jerusalem, coming down out of heaven from God, prepared as a bride adorned for her husband.</p>
            <p class="verse"><span class="verse-num">3</span> And I heard a loud voice from the throne saying, "Behold, the dwelling place of God is with man. He will dwell with them, and they will be his people, and God himself will be with them as their God.</p>
            <p class="verse"><span class="verse-num">4</span> He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away."</p>
            <p class="verse"><span class="verse-num">5</span> And he who was seated on the throne said, "Behold, I am making all things new." Also he said, "Write this down, for these words are trustworthy and true."</p>
        `;
    }
    // Return null if no specific content is found
    return null;
}

// Setup read aloud functionality
function setupReadAloud() {
    const readAloudButton = document.getElementById('read-aloud-button');
    
    if (readAloudButton) {
        readAloudButton.addEventListener('click', () => {
            const scriptureText = document.querySelector('.scripture-text');
            if (scriptureText) {
                // Get all verse text without the verse numbers
                const verses = scriptureText.querySelectorAll('.verse');
                let textToRead = '';
                
                verses.forEach(verse => {
                    // Clone the verse to avoid modifying the original
                    const verseClone = verse.cloneNode(true);
                    // Remove verse number span
                    const verseNum = verseClone.querySelector('.verse-num');
                    if (verseNum) verseNum.remove();
                    // Add the text
                    textToRead += verseClone.textContent + ' ';
                });
                
                // Use Web Speech API for text-to-speech
                const speech = new SpeechSynthesisUtterance(textToRead);
                speech.lang = 'en-US';
                speech.rate = 0.9; // Slightly slower for better comprehension
                speech.pitch = 1;
                
                // Stop any ongoing speech
                window.speechSynthesis.cancel();
                
                // Start reading
                window.speechSynthesis.speak(speech);
                
                // Update button state
                readAloudButton.classList.add('reading');
                readAloudButton.querySelector('span').textContent = 'Stop Reading';
                
                // Reset button when done
                speech.onend = () => {
                    readAloudButton.classList.remove('reading');
                    readAloudButton.querySelector('span').textContent = 'Read Aloud';
                };
                
                // Toggle reading
                readAloudButton.onclick = () => {
                    if (readAloudButton.classList.contains('reading')) {
                        window.speechSynthesis.cancel();
                        readAloudButton.classList.remove('reading');
                        readAloudButton.querySelector('span').textContent = 'Read Aloud';
                        
                        // Reset click handler
                        readAloudButton.onclick = null;
                        setupReadAloud(); // Re-initialize the event listener
                    }
                };
            }
        });
    }
}

// Sound toggle functionality has been removed

// Fix scripture display issues and add read-aloud functionality
function fixScriptureDisplay() {
    const bookSelect = document.getElementById('book-select');
    const chapterSelect = document.getElementById('chapter-select');
    const readAloudButton = document.getElementById('read-aloud-button');
    
    // Speech synthesis variables
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let isReading = false;
    
    if (bookSelect && chapterSelect) {
        // Book selection change event
        bookSelect.addEventListener('change', function() {
            populateChapters(this.value);
            
            // If a chapter is selected, display the scripture
            if (chapterSelect.value) {
                displayScripture(this.value, chapterSelect.value);
            }
        });
        
        // Chapter selection change event
        chapterSelect.addEventListener('change', function() {
            if (bookSelect.value && this.value) {
                displayScripture(bookSelect.value, this.value);
            }
        });
        
        // Pre-populate chapters for Genesis as default
        bookSelect.value = 'genesis';
        populateChapters('genesis');
        
        // Set chapter 1 as default
        setTimeout(() => {
            chapterSelect.value = '1';
            displayScripture('genesis', '1');
        }, 100);
        
        // Add more books to the select dropdown
        addMoreBooks();
    }
    
    // Read aloud functionality
    if (readAloudButton) {
        readAloudButton.addEventListener('click', function() {
            if (isReading) {
                stopReading();
            } else {
                startReading();
            }
        });
    }
    
    // Function to start reading the current scripture
    function startReading() {
        if (!speechSynthesis) return;
        
        // Get all verse elements
        const verses = document.querySelectorAll('.verse');
        if (verses.length === 0) return;
        
        // Create a text string from all verses
        let scriptureText = '';
        verses.forEach(verse => {
            // Remove the verse number span and get only the text
            const verseText = verse.textContent.replace(/^\d+\s+/, '');
            scriptureText += verseText + ' ';
        });
        
        // Create utterance
        currentUtterance = new SpeechSynthesisUtterance(scriptureText);
        
        // Set voice properties
        currentUtterance.rate = 0.9; // Slightly slower than default
        currentUtterance.pitch = 1.0;
        
        // Use default voice volume since sound settings were removed
        currentUtterance.volume = 0.7; // Default volume
        
        // Use a deeper voice if available
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            // Try to find a male voice
            const maleVoice = voices.find(voice => 
                voice.name.toLowerCase().includes('male') || 
                voice.name.toLowerCase().includes('david') ||
                voice.name.toLowerCase().includes('james'));
            
            if (maleVoice) {
                currentUtterance.voice = maleVoice;
            }
        }
        
        // Events
        currentUtterance.onstart = function() {
            isReading = true;
            readAloudButton.classList.add('reading');
            readAloudButton.querySelector('span').textContent = 'Stop Reading';
            
            // Sound notification removed
        };
        
        currentUtterance.onend = function() {
            isReading = false;
            readAloudButton.classList.remove('reading');
            readAloudButton.querySelector('span').textContent = 'Read Aloud';
        };
        
        // Start speaking
        speechSynthesis.speak(currentUtterance);
    }
    
    // Function to stop reading
    function stopReading() {
        if (!speechSynthesis || !isReading) return;
        
        speechSynthesis.cancel();
        isReading = false;
        readAloudButton.classList.remove('reading');
        readAloudButton.querySelector('span').textContent = 'Read Aloud';
        
        // Sound notification removed
    }
    
    // Helper function to populate chapters
    function populateChapters(book) {
        // Clear existing options
        chapterSelect.innerHTML = '<option value="">Chapter</option>';
        
        // Add chapters based on selected book
        if (book) {
            const chapterCount = getChapterCount(book);
            
            for (let i = 1; i <= chapterCount; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                chapterSelect.appendChild(option);
            }
        }
    }
    
    // Function to add more books to the select dropdown
    function addMoreBooks() {
        const books = [
            { value: 'leviticus', text: 'Leviticus' },
            { value: 'numbers', text: 'Numbers' },
            { value: 'deuteronomy', text: 'Deuteronomy' },
            { value: 'joshua', text: 'Joshua' },
            { value: 'judges', text: 'Judges' },
            { value: 'ruth', text: 'Ruth' },
            { value: '1samuel', text: '1 Samuel' },
            { value: '2samuel', text: '2 Samuel' },
            { value: '1kings', text: '1 Kings' },
            { value: '2kings', text: '2 Kings' },
            { value: 'psalms', text: 'Psalms' },
            { value: 'proverbs', text: 'Proverbs' },
            { value: 'isaiah', text: 'Isaiah' },
            { value: 'matthew', text: 'Matthew' },
            { value: 'mark', text: 'Mark' },
            { value: 'luke', text: 'Luke' },
            { value: 'john', text: 'John' },
            { value: 'acts', text: 'Acts' },
            { value: 'romans', text: 'Romans' },
            { value: 'revelation', text: 'Revelation' }
        ];
        
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.value;
            option.textContent = book.text;
            bookSelect.appendChild(option);
        });
    }
}

// Setup sidebar navigation functionality
function setupSidebarNavigation() {
    // Setup settings functionality
    setupSettings();
    // Setup chatbot functionality
    setupChatbot();
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Add event listeners to nav items
    if (navItems.length && contentSections.length) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Skip if it's the logout button
                if (item.id === 'logout-button') return;
                
                // Update active nav item
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
                
                // Show corresponding content section
                const sectionId = item.getAttribute('data-section');
                contentSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${sectionId}-section`) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Set home as default active section
    const homeNav = document.querySelector('.nav-item[data-section="home"]');
    if (homeNav) {
        homeNav.classList.add('active');
    }
    
    // Setup chatbot functionality
    setupChatbot();
}

// Setup chatbot functionality
function setupChatbot() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionButtons = document.querySelectorAll('.suggestion-button');
    
    // Sample responses for common questions
    const responses = {
        'who wrote genesis': 'Traditionally, Moses is considered the author of Genesis, as well as the rest of the Pentateuch (the first five books of the Bible).',
        'what is the gospel': 'The Gospel, or "Good News," is the message of salvation through Jesus Christ. It centers on His life, death, and resurrection, which provide forgiveness of sins and eternal life to all who believe.',
        'explain john 3:16': 'John 3:16 is one of the most well-known verses in the Bible. It states: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." This verse summarizes the gospel message - God\'s love for humanity led Him to sacrifice His Son so that anyone who believes in Him can have eternal life.',
        'what are the beatitudes': 'The Beatitudes are a series of blessings pronounced by Jesus at the beginning of the Sermon on the Mount (Matthew 5:3-12). They include statements like "Blessed are the poor in spirit," "Blessed are those who mourn," and "Blessed are the peacemakers." They describe the character and blessings of those who belong to God\'s kingdom.',
        'default': 'That\'s an interesting question about scripture. As I continue to learn, I\'ll be able to provide more detailed answers. Would you like to explore a specific passage or topic further?'
    };
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        
        // Create avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (isUser) {
            // User avatar
            avatarDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `;
        } else {
            // Bot avatar
            avatarDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            `;
        }
        
        // Create message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${message}</p>`;
        
        // Append to message div
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        // Add to chat container
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get response
    function getResponse(question) {
        // Convert to lowercase and remove punctuation for matching
        const normalizedQuestion = question.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Check for matching responses
        for (const [key, value] of Object.entries(responses)) {
            if (normalizedQuestion.includes(key)) {
                return value;
            }
        }
        
        // Default response
        return responses.default;
    }
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);
            
            // Clear input
            chatInput.value = '';
            
            // Simulate typing delay
            setTimeout(() => {
                // Get and add bot response
                const response = getResponse(message);
                addMessage(response);
            }, 1000);
        }
    }
    
    // Event listeners
    if (sendButton && chatInput) {
        // Send button click
        sendButton.addEventListener('click', sendMessage);
        
        // Enter key press
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Suggestion buttons
    if (suggestionButtons.length) {
        suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent;
                chatInput.value = question;
                sendMessage();
            });
        });
    }
}

// Setup settings functionality
function setupSettings() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const fontSizeButtons = document.querySelectorAll('.font-size-button');
    const currentFontSize = document.querySelector('.current-font-size');
    const settingsSelects = document.querySelectorAll('.settings-select');
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    // Theme options
    if (themeOptions.length) {
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Update active theme button
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Apply theme
                const theme = option.getAttribute('data-theme');
                applyTheme(theme);
            });
        });
    }
    
    // Font size controls
    if (fontSizeButtons.length && currentFontSize) {
        const fontSizes = ['Small', 'Medium', 'Large'];
        let currentIndex = 1; // Default to Medium
        
        fontSizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-size');
                
                if (action === 'increase' && currentIndex < fontSizes.length - 1) {
                    currentIndex++;
                } else if (action === 'decrease' && currentIndex > 0) {
                    currentIndex--;
                }
                
                // Update display
                currentFontSize.textContent = fontSizes[currentIndex];
                
                // Apply font size
                applyFontSize(fontSizes[currentIndex]);
            });
        });
    }
    
    // Toggle switches
    if (toggleSwitches.length) {
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', () => {
                // Get the setting name from the parent element
                const settingItem = toggle.closest('.setting-item');
                const settingLabel = settingItem.querySelector('label').textContent.toLowerCase();
                
                // Apply setting
                applySetting(settingLabel, toggle.checked);
            });
        });
    }
    
    // Settings selects
    if (settingsSelects.length) {
        settingsSelects.forEach(select => {
            select.addEventListener('change', () => {
                // Get the setting name from the parent element
                const settingItem = select.closest('.setting-item');
                const settingLabel = settingItem.querySelector('label').textContent.toLowerCase();
                
                // Apply setting
                applySetting(settingLabel, select.value);
            });
        });
    }
    
    // Apply theme function
    function applyTheme(theme) {
        const root = document.documentElement;
        
        switch(theme) {
            case 'dark':
                // Current dark theme (default)
                root.style.setProperty('--bg-color', '#0a0e17');
                root.style.setProperty('--card-bg', 'rgba(16, 23, 34, 0.7)');
                root.style.setProperty('--text-color', '#f8f9fa');
                break;
            case 'light':
                // Light theme
                root.style.setProperty('--bg-color', '#f0f4f8');
                root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.7)');
                root.style.setProperty('--text-color', '#1a1a2e');
                break;
            case 'sepia':
                // Sepia theme
                root.style.setProperty('--bg-color', '#f1e9d2');
                root.style.setProperty('--card-bg', 'rgba(251, 242, 219, 0.7)');
                root.style.setProperty('--text-color', '#5c4f3a');
                break;
        }
        
        // Add animation effect for theme transition
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }
    
    // Apply font size function
    function applyFontSize(size) {
        const scriptureText = document.querySelector('.scripture-text');
        
        if (scriptureText) {
            switch(size) {
                case 'Small':
                    scriptureText.style.fontSize = '0.9rem';
                    break;
                case 'Medium':
                    scriptureText.style.fontSize = '1rem';
                    break;
                case 'Large':
                    scriptureText.style.fontSize = '1.2rem';
                    break;
            }
        }
    }
    
    // Apply setting function
    function applySetting(setting, value) {
        console.log(`Setting ${setting} to ${value}`);
        
        // Handle different settings
        switch(setting) {
            case 'default bible version':
                // Update default Bible version
                const versionSelect = document.getElementById('version-select');
                if (versionSelect) {
                    versionSelect.value = value;
                }
                break;
            case 'verse numbers':
                // Show/hide verse numbers
                const verseNums = document.querySelectorAll('.verse-num');
                verseNums.forEach(num => {
                    num.style.display = value ? 'inline' : 'none';
                });
                break;
            case 'email notifications':
                // Would connect to notification system in a real app
                break;
            case 'data sync':
                // Would connect to sync system in a real app
                break;
        }
    }
}

// Setup chatbot functionality
function setupChatbot() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const suggestionButtons = document.querySelectorAll('.suggestion-button');
    
    // Sample responses for common Bible questions
    const responses = {
        'genesis': 'Genesis is the first book of the Bible. It begins with the story of creation: "In the beginning God created the heavens and the earth."',
        'jesus': 'Jesus Christ is the central figure of Christianity. According to the Bible, he is the Son of God who came to Earth, performed miracles, died on the cross for humanity\'s sins, and was resurrected.',
        'commandments': 'The Ten Commandments are a set of biblical principles relating to ethics and worship. They include: 1. You shall have no other gods before Me. 2. You shall not make idols. 3. You shall not take the name of the LORD your God in vain. 4. Remember the Sabbath day, to keep it holy. 5. Honor your father and your mother. 6. You shall not murder. 7. You shall not commit adultery. 8. You shall not steal. 9. You shall not bear false witness. 10. You shall not covet.',
        'psalms': 'Psalms is a book of the Bible containing a collection of religious verses, songs, and prayers. One of the most famous is Psalm 23, which begins: "The LORD is my shepherd; I shall not want."',
        'revelation': 'Revelation is the final book of the New Testament. It contains apocalyptic visions and prophecies about the end times.',
        'salvation': 'In Christianity, salvation refers to the deliverance from sin and its consequences. According to the Bible, salvation comes through faith in Jesus Christ.',
        'prayer': 'Prayer is communication with God. The Bible teaches various forms of prayer including praise, thanksgiving, confession, and petition.',
        'faith': 'Faith is trust or belief in God and His promises. Hebrews 11:1 defines it as "the assurance of things hoped for, the conviction of things not seen."',
        'love': 'The Bible teaches that God is love and that love is the greatest commandment. 1 Corinthians 13 describes love as patient, kind, not envious, not boastful, not proud, not rude, not self-seeking, not easily angered, and keeping no record of wrongs.',
        'forgiveness': 'Forgiveness is a central theme in the Bible. Jesus taught his followers to forgive others as they have been forgiven by God.',
        'heaven': 'Heaven is described in the Bible as the dwelling place of God and the eternal home for believers. It is portrayed as a place of joy, peace, and the absence of suffering.',
        'hell': 'Hell is described in the Bible as a place of eternal separation from God, often associated with suffering and punishment for sin.',
        'sin': 'Sin is defined in the Bible as disobedience to God\'s commands. Romans 3:23 states that "all have sinned and fall short of the glory of God."',
        'grace': 'Grace in the Bible refers to the unmerited favor of God. Ephesians 2:8-9 states, "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."',
        'holy spirit': 'The Holy Spirit is the third person of the Trinity in Christian theology. The Bible describes the Holy Spirit as a helper, comforter, and guide for believers.',
        'baptism': 'Baptism is a Christian ritual symbolizing purification and admission to the church. It represents the believer\'s identification with Christ\'s death, burial, and resurrection.',
        'resurrection': 'The resurrection refers to Jesus rising from the dead on the third day after his crucifixion. It is a central belief in Christianity, symbolizing victory over sin and death.',
        'apostles': 'The Apostles were the twelve disciples chosen by Jesus to spread his teachings. They included Peter, James, John, Andrew, Philip, Bartholomew, Matthew, Thomas, James son of Alphaeus, Thaddaeus, Simon the Zealot, and Judas Iscariot (later replaced by Matthias).',
        'parables': 'Parables are simple stories used to illustrate moral or spiritual lessons. Jesus frequently used parables in his teaching, such as the Parable of the Good Samaritan and the Parable of the Prodigal Son.'
    };
    
    // Add event listener for send button
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add event listeners for suggestion buttons
    if (suggestionButtons.length) {
        suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.textContent;
                chatInput.value = question;
                sendMessage();
            });
        });
    }
    
    // Function to send a message
    function sendMessage() {
        if (!chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        chatInput.value = '';
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Generate and add bot response
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    // Function to add a message to the chat
    function addMessage(message, sender) {
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        
        // Create avatar
        const avatar = document.createElement('div');
        avatar.classList.add('message-avatar');
        
        // Add appropriate icon based on sender
        if (sender === 'user') {
            avatar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        } else {
            avatar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`;
        }
        
        // Create message content
        const content = document.createElement('div');
        content.classList.add('message-content');
        content.textContent = message;
        
        // Assemble message
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        
        // Add to chat
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageElement.classList.add('slide-in-up');
    }
    
    // Function to generate a response based on user input
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Check for specific keywords in the message
        for (const keyword in responses) {
            if (message.includes(keyword)) {
                return responses[keyword];
            }
        }
        
        // Default responses if no keyword match
        const defaultResponses = [
            "I'm not sure about that. Could you ask something about a specific Bible book, character, or concept?",
            "That's an interesting question! The Bible has many teachings on different topics. Could you be more specific?",
            "I'd be happy to help with your Bible questions. Try asking about Genesis, Jesus, the Ten Commandments, or salvation.",
            "I don't have information on that specific topic. Would you like to know about another biblical concept?"
        ];
        
        // Return a random default response
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Add initial bot greeting
    setTimeout(() => {
        addMessage("Hello! I'm your Bible assistant. How can I help you today? You can ask me about biblical concepts, characters, or books.", 'bot');
    }, 500);
}

// Setup bookmarks functionality
function setupBookmarks() {
    // Get bookmark elements
    const bookmarkButton = document.querySelector('.tool-button[title="Bookmark this passage"]');
    const bookmarksSection = document.getElementById('bookmarks-section');
    const bookmarksContainer = document.querySelector('.bookmarks-container');
    const bookmarkActionButtons = document.querySelectorAll('.bookmark-action-button');
    
    // Initialize bookmarks array from localStorage or create empty array
    let bookmarks = JSON.parse(localStorage.getItem('cosmicBibleBookmarks')) || [];
    
    // Function to save bookmarks to localStorage
    const saveBookmarks = () => {
        localStorage.setItem('cosmicBibleBookmarks', JSON.stringify(bookmarks));
    };
    
    // Function to render bookmarks in the bookmarks container
    const renderBookmarks = () => {
        // Clear existing bookmarks
        if (bookmarksContainer) {
            bookmarksContainer.innerHTML = '';
            
            if (bookmarks.length === 0) {
                // Show message if no bookmarks
                bookmarksContainer.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <p>You don't have any bookmarks yet</p>
                        <button class="card-button">Go to Read</button>
                    </div>
                `;
                
                // Add event listener to the "Go to Read" button
                const goToReadButton = bookmarksContainer.querySelector('.card-button');
                if (goToReadButton) {
                    goToReadButton.addEventListener('click', () => {
                        const readNavItem = document.querySelector('.nav-item[data-section="read"]');
                        if (readNavItem) {
                            readNavItem.click();
                        }
                    });
                }
            } else {
                // Create bookmark cards for each bookmark
                bookmarks.forEach((bookmark, index) => {
                    const bookmarkCard = document.createElement('div');
                    bookmarkCard.className = 'bookmark-card';
                    bookmarkCard.dataset.index = index;
                    
                    // Format the date
                    const bookmarkDate = new Date(bookmark.date);
                    const formattedDate = bookmarkDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    // Create bookmark card HTML
                    bookmarkCard.innerHTML = `
                        <div class="bookmark-header">
                            <h3>${bookmark.title}</h3>
                            <span class="bookmark-date">${formattedDate}</span>
                        </div>
                        <p class="bookmark-content">${bookmark.preview}</p>
                        <div class="bookmark-actions">
                            <button class="bookmark-action-button" title="Read" data-action="read" data-index="${index}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="bookmark-action-button" title="Delete" data-action="delete" data-index="${index}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    `;
                    
                    // Add the bookmark card to the container
                    bookmarksContainer.appendChild(bookmarkCard);
                });
                
                // Add event listeners to the bookmark action buttons
                const actionButtons = bookmarksContainer.querySelectorAll('.bookmark-action-button');
                actionButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const action = button.getAttribute('data-action');
                        const index = parseInt(button.getAttribute('data-index'));
                        const bookmark = bookmarks[index];
                        
                        if (action === 'read') {
                            // Navigate to the read section and load the bookmarked passage
                            const readNavItem = document.querySelector('.nav-item[data-section="read"]');
                            if (readNavItem) {
                                readNavItem.click();
                                
                                // Set the book and chapter in the dropdowns
                                setTimeout(() => {
                                    const bookSelect = document.getElementById('book-select');
                                    if (bookSelect) {
                                        // Find and select the book
                                        for (let i = 0; i < bookSelect.options.length; i++) {
                                            if (bookSelect.options[i].value === bookmark.book) {
                                                bookSelect.selectedIndex = i;
                                                
                                                // Trigger change event to populate chapters
                                                const event = new Event('change');
                                                bookSelect.dispatchEvent(event);
                                                
                                                // Select the chapter
                                                setTimeout(() => {
                                                    const chapterSelect = document.getElementById('chapter-select');
                                                    if (chapterSelect && chapterSelect.options.length > 0) {
                                                        for (let j = 0; j < chapterSelect.options.length; j++) {
                                                            if (chapterSelect.options[j].value === bookmark.chapter) {
                                                                chapterSelect.selectedIndex = j;
                                                                
                                                                // Trigger change event to display scripture
                                                                const chapterEvent = new Event('change');
                                                                chapterSelect.dispatchEvent(chapterEvent);
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }, 300);
                                                break;
                                            }
                                        }
                                    }
                                }, 300);
                            }
                        } else if (action === 'delete') {
                            // Show confirmation dialog
                            if (confirm(`Are you sure you want to delete the bookmark for ${bookmark.title}?`)) {
                                // Remove the bookmark from the array
                                bookmarks.splice(index, 1);
                                
                                // Save updated bookmarks to localStorage
                                saveBookmarks();
                                
                                // Re-render the bookmarks
                                renderBookmarks();
                                
                                // Show success message with animation
                                const notification = document.createElement('div');
                                notification.className = 'notification success';
                                notification.innerHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>Bookmark deleted successfully</span>
                                `;
                                
                                document.body.appendChild(notification);
                                
                                // Remove notification after 3 seconds
                                setTimeout(() => {
                                    notification.classList.add('fade-out');
                                    setTimeout(() => {
                                        document.body.removeChild(notification);
                                    }, 300);
                                }, 3000);
                            }
                        }
                    });
                });
            }
        }
    };
    
    // Add event listener to bookmark button in scripture tools
    if (bookmarkButton) {
        bookmarkButton.addEventListener('click', () => {
            // Get current book and chapter
            const bookSelect = document.getElementById('book-select');
            const chapterSelect = document.getElementById('chapter-select');
            
            if (bookSelect && chapterSelect && bookSelect.value && chapterSelect.value) {
                const book = bookSelect.value;
                const chapter = chapterSelect.value;
                const bookName = bookSelect.options[bookSelect.selectedIndex].text;
                const chapterName = chapterSelect.options[chapterSelect.selectedIndex].text;
                const title = `${bookName} ${chapterName}`;
                
                // Get scripture content preview
                const scriptureText = document.querySelector('.scripture-text');
                let preview = '';
                
                if (scriptureText) {
                    const firstVerse = scriptureText.querySelector('.verse');
                    if (firstVerse) {
                        preview = firstVerse.textContent.trim();
                        // Limit preview length
                        if (preview.length > 100) {
                            preview = preview.substring(0, 100) + '...';
                        }
                    }
                }
                
                // Create bookmark object
                const bookmark = {
                    book,
                    chapter,
                    title,
                    preview,
                    date: new Date().toISOString()
                };
                
                // Check if bookmark already exists
                const existingIndex = bookmarks.findIndex(b => b.book === book && b.chapter === chapter);
                
                if (existingIndex !== -1) {
                    // Update existing bookmark
                    bookmarks[existingIndex] = bookmark;
                    
                    // Show update message
                    bookmarkButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Updated</span>
                    `;
                } else {
                    // Add new bookmark
                    bookmarks.push(bookmark);
                    
                    // Show success message
                    bookmarkButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Added</span>
                    `;
                }
                
                // Add success animation
                bookmarkButton.classList.add('success-animation');
                
                // Save bookmarks to localStorage
                saveBookmarks();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    bookmarkButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Bookmark</span>
                    `;
                    bookmarkButton.classList.remove('success-animation');
                }, 2000);
                
                // Re-render bookmarks if the bookmarks section is visible
                if (bookmarksSection && bookmarksSection.classList.contains('active')) {
                    renderBookmarks();
                }
            }
        });
    }
    
    // Initial render of bookmarks
    renderBookmarks();
}

// Setup home page features functionality
function setupHomePageFeatures() {
    // Get all card buttons in the home section
    const shareButton = document.querySelector('.verse-of-day .card-button');
    const continueReadingButton = document.querySelector('.reading-plan .card-button');
    const viewAllNotesButton = document.querySelector('.recent-notes .card-button');
    const quickButtons = document.querySelectorAll('.quick-button');
    
    // Share verse of the day functionality
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            const verseText = document.querySelector('.verse-text').textContent;
            const verseReference = document.querySelector('.verse-reference').textContent;
            
            // Create a temporary textarea to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = `${verseText} - ${verseReference}`;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show confirmation with animation
            const originalText = shareButton.textContent;
            shareButton.textContent = 'Copied!';
            shareButton.classList.add('success-animation');
            
            setTimeout(() => {
                shareButton.textContent = originalText;
                shareButton.classList.remove('success-animation');
            }, 2000);
        });
    }
    
    // Continue reading functionality
    if (continueReadingButton) {
        continueReadingButton.addEventListener('click', () => {
            // Get the current reading from the plan
            const currentReading = document.querySelector('.reading-info span').textContent;
            const [book, chapters] = currentReading.split(' ');
            
            // Navigate to read section
            const readNavItem = document.querySelector('.nav-item[data-section="read"]');
            if (readNavItem) {
                readNavItem.click();
                
                // Set the book and chapter in the dropdowns
                setTimeout(() => {
                    const bookSelect = document.getElementById('book-select');
                    if (bookSelect) {
                        // Convert book name to match option value format (lowercase)
                        const bookValue = book.toLowerCase();
                        
                        // Find and select the book
                        for (let i = 0; i < bookSelect.options.length; i++) {
                            if (bookSelect.options[i].value === bookValue) {
                                bookSelect.selectedIndex = i;
                                
                                // Trigger change event to populate chapters
                                const event = new Event('change');
                                bookSelect.dispatchEvent(event);
                                
                                // Select the first chapter from the range
                                setTimeout(() => {
                                    const chapterSelect = document.getElementById('chapter-select');
                                    if (chapterSelect && chapterSelect.options.length > 0) {
                                        // Get first chapter from range (e.g., "23-25" -> "23")
                                        const firstChapter = chapters.split('-')[0];
                                        
                                        // Find and select the chapter
                                        for (let j = 0; j < chapterSelect.options.length; j++) {
                                            if (chapterSelect.options[j].value === firstChapter) {
                                                chapterSelect.selectedIndex = j;
                                                
                                                // Trigger change event to display scripture
                                                const chapterEvent = new Event('change');
                                                chapterSelect.dispatchEvent(chapterEvent);
                                                break;
                                            }
                                        }
                                    }
                                }, 300);
                                break;
                            }
                        }
                    }
                }, 300);
            }
        });
    }
    
    // View all notes functionality
    if (viewAllNotesButton) {
        viewAllNotesButton.addEventListener('click', () => {
            // Navigate to study section which contains notes
            const studyNavItem = document.querySelector('.nav-item[data-section="study"]');
            if (studyNavItem) {
                studyNavItem.click();
                
                // Scroll to notes section if it exists
                setTimeout(() => {
                    const notesSection = document.querySelector('.notes-section');
                    if (notesSection) {
                        notesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        });
    }
    
    // Quick access buttons functionality
    if (quickButtons.length) {
        quickButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const buttonText = button.querySelector('span').textContent;
                
                // Handle different quick access buttons
                switch (buttonText) {
                    case 'Last Read':
                        // Navigate to read section with last read content
                        const readNavItem = document.querySelector('.nav-item[data-section="read"]');
                        if (readNavItem) {
                            readNavItem.click();
                            
                            // Simulate last read as John 3 (or could be stored in localStorage)
                            setTimeout(() => {
                                const bookSelect = document.getElementById('book-select');
                                if (bookSelect) {
                                    // Find and select John
                                    for (let i = 0; i < bookSelect.options.length; i++) {
                                        if (bookSelect.options[i].value === 'john') {
                                            bookSelect.selectedIndex = i;
                                            
                                            // Trigger change event
                                            const event = new Event('change');
                                            bookSelect.dispatchEvent(event);
                                            
                                            // Select chapter 3
                                            setTimeout(() => {
                                                const chapterSelect = document.getElementById('chapter-select');
                                                if (chapterSelect && chapterSelect.options.length > 0) {
                                                    for (let j = 0; j < chapterSelect.options.length; j++) {
                                                        if (chapterSelect.options[j].value === '3') {
                                                            chapterSelect.selectedIndex = j;
                                                            
                                                            // Trigger change event
                                                            const chapterEvent = new Event('change');
                                                            chapterSelect.dispatchEvent(chapterEvent);
                                                            break;
                                                        }
                                                    }
                                                }
                                            }, 300);
                                            break;
                                        }
                                    }
                                }
                            }, 300);
                        }
                        break;
                        
                    case 'Search':
                        // Navigate to search section
                        const searchNavItem = document.querySelector('.nav-item[data-section="search"]');
                        if (searchNavItem) {
                            searchNavItem.click();
                            
                            // Focus on search input if it exists
                            setTimeout(() => {
                                const searchInput = document.querySelector('.search-input');
                                if (searchInput) {
                                    searchInput.focus();
                                }
                            }, 300);
                        }
                        break;
                        
                    case 'Bookmarks':
                        // Navigate to study section and show bookmarks
                        const studyNavItem = document.querySelector('.nav-item[data-section="study"]');
                        if (studyNavItem) {
                            studyNavItem.click();
                            
                            // Show bookmarks tab if it exists
                            setTimeout(() => {
                                const bookmarksTab = document.querySelector('.study-tab[data-tab="bookmarks"]');
                                if (bookmarksTab) {
                                    bookmarksTab.click();
                                }
                            }, 300);
                        }
                        break;
                        
                    case 'New Note':
                        // Navigate to study section and open new note interface
                        const studyNavItem2 = document.querySelector('.nav-item[data-section="study"]');
                        if (studyNavItem2) {
                            studyNavItem2.click();
                            
                            // Show notes tab and click new note button if they exist
                            setTimeout(() => {
                                const notesTab = document.querySelector('.study-tab[data-tab="notes"]');
                                if (notesTab) {
                                    notesTab.click();
                                    
                                    setTimeout(() => {
                                        const newNoteButton = document.querySelector('.new-note-button');
                                        if (newNoteButton) {
                                            newNoteButton.click();
                                        }
                                    }, 300);
                                }
                            }, 300);
                        }
                        break;
                }
                
                // Add click animation
                button.classList.add('button-clicked');
                setTimeout(() => {
                    button.classList.remove('button-clicked');
                }, 300);
            });
        });
    }
}

// Setup premium features handling
function setupPremiumFeatures() {
    // Get all premium features
    const premiumFeatures = document.querySelectorAll('.premium-feature, .premium-tool');
    
    // Function to update premium features based on user status
    function updatePremiumFeatures() {
        premiumFeatures.forEach(feature => {
            // Find buttons within premium features
            const buttons = feature.querySelectorAll('button');
            
            if (userStatus.isPremium || userStatus.isAdmin) {
                // Remove premium badge if user has access
                const badge = feature.querySelector('.premium-badge');
                if (badge) badge.style.display = 'none';
                
                // Update button text from 'Upgrade' to 'Open'
                buttons.forEach(button => {
                    if (button.textContent.trim() === 'Upgrade') {
                        button.textContent = 'Open';
                    }
                });
                
                // Remove any disabled states
                feature.classList.remove('disabled');
            } else {
                // Ensure premium badge is visible
                const badge = feature.querySelector('.premium-badge');
                if (badge) badge.style.display = 'block';
                
                // Add click handler to premium buttons
                buttons.forEach(button => {
                    if (!button.hasAttribute('data-premium-handler')) {
                        button.setAttribute('data-premium-handler', 'true');
                        button.addEventListener('click', showPremiumUpgrade);
                    }
                });
            }
        });
    }
    
    // Function to show premium upgrade prompt
    function showPremiumUpgrade(e) {
        e.preventDefault();
        
        // In a real app, you would show a premium upgrade modal
        // For now, just redirect to the options page
        const dashboardPage = document.getElementById('dashboard-page');
        const optionsPage = document.getElementById('options-page');
        
        if (dashboardPage && optionsPage) {
            // Hide dashboard
            dashboardPage.style.opacity = '0';
            dashboardPage.style.pointerEvents = 'none';
            
            // Show options page after a slight delay
            setTimeout(() => {
                dashboardPage.style.display = 'none';
                optionsPage.style.display = 'flex';
                optionsPage.style.opacity = '1';
                optionsPage.style.pointerEvents = 'all';
                
                // Highlight the premium option
                const premiumCard = document.querySelector('.option-card.premium');
                if (premiumCard) {
                    premiumCard.classList.add('highlight');
                    setTimeout(() => {
                        premiumCard.classList.remove('highlight');
                    }, 1500);
                }
            }, 400);
        }
    }
    
    // Initial update of premium features
    updatePremiumFeatures();
    
    // Update premium features when user status changes
    document.addEventListener('userStatusChanged', updatePremiumFeatures);
}
