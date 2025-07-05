 // Sample image data
        const images = [
            {
                id: 1,
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                title: 'Mountain Sunrise',
                description: 'Beautiful sunrise over mountain peaks',
                category: 'nature'
            },
            {
                id: 2,
                src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
                title: 'City Skyline',
                description: 'Modern city architecture at dusk',
                category: 'city'
            },
            {
                id: 3,
                src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
                title: 'Portrait Study',
                description: 'Natural light portrait photography',
                category: 'people'
            },
            {
                id: 4,
                src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
                title: 'Forest Path',
                description: 'Mystical forest trail in morning light',
                category: 'nature'
            },
            {
                id: 5,
                src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
                title: 'Urban Night',
                description: 'Neon lights reflecting on wet streets',
                category: 'city'
            },
            {
                id: 6,
                src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                title: 'Abstract Colors',
                description: 'Vibrant abstract art composition',
                category: 'art'
            },
            {
                id: 7,
                src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
                title: 'Ocean Waves',
                description: 'Powerful waves crashing on rocky shore',
                category: 'nature'
            },
            {
                id: 8,
                src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
                title: 'Street Art',
                description: 'Colorful mural on urban wall',
                category: 'art'
            },
            {
                id: 9,
                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                title: 'Happy Moment',
                description: 'Candid laughter and joy',
                category: 'people'
            }
        ];

        let currentImageIndex = 0;
        let filteredImages = images;

        // DOM elements
        const gallery = document.getElementById('gallery');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const viewBtns = document.querySelectorAll('.view-btn');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Initialize gallery
        function renderGallery() {
            gallery.innerHTML = '';
            
            filteredImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <div class="image-container">
                        <img src="${image.src}" alt="${image.title}" loading="lazy">
                        <div class="overlay">
                            <div class="overlay-content">
                                <h3>${image.title}</h3>
                                <p>${image.description}</p>
                            </div>
                        </div>
                        <div class="category-tag">${image.category}</div>
                    </div>
                    <div class="info">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => openLightbox(index));
                gallery.appendChild(galleryItem);
            });
        }

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter images
                if (filter === 'all') {
                    filteredImages = images;
                } else {
                    filteredImages = images.filter(img => img.category === filter);
                }
                
                // Add fade out effect
                const items = document.querySelectorAll('.gallery-item');
                items.forEach(item => item.classList.add('hidden'));
                
                setTimeout(() => {
                    renderGallery();
                }, 200);
            });
        });

        // View toggle functionality
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                
                // Update active button
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update gallery class
                gallery.className = `gallery ${view}-view`;
            });
        });

        // Lightbox functionality
        function openLightbox(index) {
            currentImageIndex = index;
            const image = filteredImages[currentImageIndex];
            lightboxImg.src = image.src;
            lightboxImg.alt = image.title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showPreviousImage() {
            currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            const image = filteredImages[currentImageIndex];
            lightboxImg.src = image.src;
            lightboxImg.alt = image.title;
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            const image = filteredImages[currentImageIndex];
            lightboxImg.src = image.src;
            lightboxImg.alt = image.title;
        }

        // Event listeners
        lightboxClose.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPreviousImage);
        nextBtn.addEventListener('click', showNextImage);

        // Close lightbox on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        showPreviousImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            }
        });

        // Initialize
        renderGallery();