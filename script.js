// Property Data
const properties = [
    {
        id: 1,
        title: "Modern Apartment in Casablanca Marina",
        location: "Casablanca",
        type: "apartment",
        price: 1850000,
        bedrooms: 3,
        bathrooms: 2,
        area: 145,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85",
        featured: true,
        amenities: ["pool", "parking", "terrace", "gym"],
        description: "Stunning modern apartment with panoramic ocean views. Located in the prestigious Marina district, this property features contemporary design with traditional Moroccan touches. Floor-to-ceiling windows flood the space with natural light."
    },
    {
        id: 2,
        title: "Luxury Villa in Marrakech Palmeraie",
        location: "Marrakech",
        type: "villa",
        price: 4500000,
        bedrooms: 5,
        bathrooms: 4,
        area: 380,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85",
        featured: true,
        amenities: ["pool", "garden", "parking", "terrace"],
        description: "Magnificent villa set in lush palm groves. This exceptional property combines traditional Moroccan architecture with modern luxury amenities. Private pool, landscaped gardens, and stunning mountain views."
    },
    {
        id: 3,
        title: "Traditional Riad in Marrakech Medina",
        location: "Marrakech",
        type: "riad",
        price: 2800000,
        bedrooms: 4,
        bathrooms: 3,
        area: 220,
        image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&q=85",
        featured: false,
        amenities: ["garden", "terrace", "parking"],
        description: "Authentic restored riad in the heart of the historic Medina. Features traditional Moroccan craftsmanship including zellige tiles, carved cedar wood, and a central courtyard with fountain."
    },
    {
        id: 4,
        title: "Penthouse with Ocean View - Rabat",
        location: "Rabat",
        type: "penthouse",
        price: 3200000,
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=85",
        featured: true,
        amenities: ["pool", "parking", "terrace", "gym"],
        description: "Exclusive penthouse with breathtaking Atlantic Ocean views. Premium finishes, spacious terrace, private pool, and access to building amenities including gym and spa."
    },
    {
        id: 5,
        title: "Beachfront Apartment in Tangier",
        location: "Tangier",
        type: "apartment",
        price: 1450000,
        bedrooms: 2,
        bathrooms: 2,
        area: 110,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
        featured: false,
        amenities: ["pool", "parking", "terrace"],
        description: "Beautiful beachfront apartment with direct sea access. Modern design, open-plan living, and large balcony perfect for enjoying Mediterranean sunsets."
    },
    {
        id: 6,
        title: "Contemporary Villa in Casablanca",
        location: "Casablanca",
        type: "villa",
        price: 5200000,
        bedrooms: 6,
        bathrooms: 5,
        area: 450,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85",
        featured: false,
        amenities: ["pool", "garden", "parking", "gym"],
        description: "Architectural masterpiece in an exclusive neighborhood. State-of-the-art home automation, infinity pool, home cinema, and beautifully landscaped gardens."
    },
    {
        id: 7,
        title: "Charming Apartment in Rabat Agdal",
        location: "Rabat",
        type: "apartment",
        price: 980000,
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=85",
        featured: false,
        amenities: ["parking"],
        description: "Cozy apartment in the vibrant Agdal district. Perfect for young professionals, close to amenities, restaurants, and public transport."
    },
    {
        id: 8,
        title: "Luxury Riad with Pool - Fes",
        location: "Fes",
        type: "riad",
        price: 3500000,
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
        featured: true,
        amenities: ["pool", "garden", "terrace", "parking"],
        description: "Exquisite restored riad with contemporary amenities. Featuring a stunning central courtyard, rooftop terrace with city views, and traditional Moroccan spa."
    },
    {
        id: 9,
        title: "Modern Penthouse in Marrakech Gueliz",
        location: "Marrakech",
        type: "penthouse",
        price: 2650000,
        bedrooms: 3,
        bathrooms: 2,
        area: 195,
        image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=85",
        featured: false,
        amenities: ["pool", "parking", "terrace", "gym"],
        description: "Sleek penthouse in the modern Gueliz district. Panoramic Atlas Mountain views, designer interiors, and rooftop infinity pool."
    }
];

// State
let filteredProperties = [...properties];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const propertiesGrid = document.getElementById('propertiesGrid');
const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');
const applyFilters = document.getElementById('applyFilters');
const clearFilters = document.getElementById('clearFilters');
const sortBy = document.getElementById('sortBy');
const searchBtn = document.getElementById('searchBtn');
const propertyModal = document.getElementById('propertyModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const viewFavorites = document.getElementById('viewFavorites');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);
    updateFavoriteCount();
    initScrollAnimations();
    initSmoothScroll();
});

// Render Properties
function renderProperties(props) {
    if (props.length === 0) {
        propertiesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-gray);"><h3>No properties found</h3><p>Try adjusting your filters</p></div>';
        return;
    }

    propertiesGrid.innerHTML = props.map(property => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                ${property.featured ? '<div class="property-badge">Featured</div>' : ''}
                <button class="property-favorite ${favorites.includes(property.id) ? 'active' : ''}" data-id="${property.id}" aria-label="Add to favorites">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="${favorites.includes(property.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
            <div class="property-info">
                <div class="property-price">${formatPrice(property.price)} MAD</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${property.location}
                </div>
                <div class="property-features">
                    <div class="property-feature">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        ${property.bedrooms} Beds
                    </div>
                    <div class="property-feature">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 6h6M9 12h6M9 18h6M3 6h1M3 12h1M3 18h1M19 6h1M19 12h1M19 18h1"/>
                        </svg>
                        ${property.bathrooms} Baths
                    </div>
                    <div class="property-feature">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 7h-7a2 2 0 0 1 0-4h7v4zm0 0v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/>
                        </svg>
                        ${property.area} m²
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.property-favorite')) {
                openPropertyModal(parseInt(card.dataset.id));
            }
        });
    });

    document.querySelectorAll('.property-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('fr-MA').format(price);
}

// Toggle Favorite
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();
    renderProperties(filteredProperties);
}

// Update Favorite Count
function updateFavoriteCount() {
    const count = document.querySelector('.favorite-count');
    if (count) count.textContent = favorites.length;
}

// View Favorites
viewFavorites.addEventListener('click', () => {
    if (favorites.length === 0) {
        alert('You have no favorite properties yet!');
        return;
    }
    filteredProperties = properties.filter(p => favorites.includes(p.id));
    renderProperties(filteredProperties);
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

// Filter Toggle
filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('active');
});

// Apply Filters
applyFilters.addEventListener('click', () => {
    const bedroomFilters = Array.from(document.querySelectorAll('input[name="bedrooms"]:checked')).map(cb => parseInt(cb.value));
    const amenityFilters = Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value);

    filteredProperties = properties.filter(property => {
        const bedroomMatch = bedroomFilters.length === 0 || bedroomFilters.some(b => property.bedrooms >= b);
        const amenityMatch = amenityFilters.length === 0 || amenityFilters.every(a => property.amenities.includes(a));
        return bedroomMatch && amenityMatch;
    });

    renderProperties(filteredProperties);
    filterPanel.classList.remove('active');
});

// Clear Filters
clearFilters.addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    filteredProperties = [...properties];
    renderProperties(filteredProperties);
    filterPanel.classList.remove('active');
});

// Sort
sortBy.addEventListener('change', (e) => {
    const value = e.target.value;

    switch (value) {
        case 'price-low':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProperties.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredProperties.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    renderProperties(filteredProperties);
});

// Search
searchBtn.addEventListener('click', () => {
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const type = document.getElementById('searchType').value;
    const priceRange = document.getElementById('searchPrice').value;

    filteredProperties = properties.filter(property => {
        const locationMatch = !location || property.location.toLowerCase().includes(location);
        const typeMatch = !type || property.type === type;

        let priceMatch = true;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            priceMatch = property.price >= min && property.price <= max;
        }

        return locationMatch && typeMatch && priceMatch;
    });

    renderProperties(filteredProperties);
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
});

// Open Property Modal
function openPropertyModal(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    const amenityIcons = {
        pool: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 19c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
        garden: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 3.75 3 6.5 3 6.5s3-2.75 3-6.5a3 3 0 0 0-3-3z"/><path d="M12 16.5c-3 0-5.5 2-5.5 5.5h11c0-3.5-2.5-5.5-5.5-5.5z"/></svg>',
        parking: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 8h4a3 3 0 0 1 0 6H9V8z"/></svg>',
        terrace: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
        gym: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11M3 12h3M18 12h3M12 3v3M12 18v3"/></svg>'
    };

    modalBody.innerHTML = `
        <div class="modal-gallery">
            <img src="${property.image}" alt="${property.title}">
        </div>
        <div class="modal-details">
            <h2>${property.title}</h2>
            <div class="property-location" style="margin-bottom: 1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                ${property.location}
            </div>
            <div class="modal-price">${formatPrice(property.price)} MAD</div>
            <div class="property-features" style="margin-bottom: 1.5rem;">
                <div class="property-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    ${property.bedrooms} Bedrooms
                </div>
                <div class="property-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 6h6M9 12h6M9 18h6M3 6h1M3 12h1M3 18h1M19 6h1M19 12h1M19 18h1"/>
                    </svg>
                    ${property.bathrooms} Bathrooms
                </div>
                <div class="property-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 7h-7a2 2 0 0 1 0-4h7v4zm0 0v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/>
                    </svg>
                    ${property.area} m²
                </div>
            </div>
            <p class="modal-description">${property.description}</p>
            <h3 style="margin-bottom: 1rem; color: var(--color-secondary);">Amenities</h3>
            <div class="modal-amenities">
                ${property.amenities.map(amenity => `
                    <div class="amenity-item">
                        ${amenityIcons[amenity] || ''}
                        <span style="text-transform: capitalize;">${amenity}</span>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary btn-block whatsapp-btn" style="margin-top: 2rem;" onclick="contactViaWhatsApp('${property.title.replace(/'/g, "\\'")}', ${property.price})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact via WhatsApp
            </button>
        </div>
    `;

    propertyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Contact via WhatsApp
function contactViaWhatsApp(propertyTitle, propertyPrice) {
    const phoneNumber = '212634961626'; // WhatsApp number (without + or spaces)
    const message = `Hello! I'm interested in: ${propertyTitle}%0APrice: ${formatPrice(propertyPrice)} MAD%0A%0ACould you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Close Modal
function closeModal() {
    propertyModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate property cards on scroll
    setTimeout(() => {
        document.querySelectorAll('.property-card, .stat-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    alert('Thank you for your message! We will contact you soon.');
    contactForm.reset();
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScroll = currentScroll;
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
