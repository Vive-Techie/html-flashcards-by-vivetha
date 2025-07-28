// Flashcard Application JavaScript

class FlashcardApp {
    constructor() {
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        // Flashcard data
        this.flashcards = [
            {
                front: "&lt;marquee&gt;",
                status: "Deprecated",
                description: "Used to scroll text horizontally or vertically.",
                example: "&lt;marquee&gt;🌸 Welcome to Vivetha's HTML World! 🌸&lt;/marquee&gt;",
                note: "Creates scrolling text animation but deprecated due to accessibility issues"
            },
            {
                front: "&lt;blink&gt;",
                status: "Deprecated", 
                description: "Used to make text blink (works only in old browsers).",
                example: "&lt;blink&gt;This text may or may not blink 😅&lt;/blink&gt;",
                note: "Makes text flash on and off - removed from modern browsers"
            },
            {
                front: "&lt;strike&gt;",
                status: "Deprecated",
                description: "Used to show strikethrough text.",
                example: "&lt;strike&gt;This is old text&lt;/strike&gt;",
                note: "Displays text with a line through it - replaced by CSS text-decoration"
            },
            {
                front: "&lt;wbr&gt;",
                status: "Current",
                description: "Inserts a word break opportunity in long words.",
                example: "Supercalifragilistic&lt;wbr&gt;expialidocious",
                note: "Suggests where a line break can occur in long words"
            },
            {
                front: "&lt;details&gt; & &lt;summary&gt;",
                status: "Current",
                description: "Used to create a collapsible content section.",
                example: "&lt;details&gt;&lt;summary&gt;Click me&lt;/summary&gt;Hidden content&lt;/details&gt;",
                note: "Creates expandable/collapsible content areas"
            },
            {
                front: "&lt;meter&gt;",
                status: "Current",
                description: "Displays a measurement within a range.",
                example: "Battery: &lt;meter value=\"0.6\"&gt;60%&lt;/meter&gt;",
                note: "Shows scalar values like progress, disk usage, or battery levels"
            },
            {
                front: "&lt;time&gt;",
                status: "Current",
                description: "Used to display time/date info in machine-readable form.",
                example: "&lt;time datetime=\"2025-11-21\"&gt;November 21, 2025&lt;/time&gt;",
                note: "Provides semantic meaning to dates and times for search engines"
            },
            {
                front: "&lt;ruby&gt;, &lt;rt&gt;, &lt;rp&gt;",
                status: "Current",
                description: "Used in East Asian languages for pronunciation.",
                example: "&lt;ruby&gt;漢 &lt;rt&gt;hàn&lt;/rt&gt;&lt;/ruby&gt;",
                note: "Displays pronunciation guides above characters in Asian languages"
            }
        ];

        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.createDotIndicators();
        this.loadCard(0);
    }

    initializeElements() {
        // Get DOM elements
        this.flashcard = document.getElementById('flashcard');
        this.tagName = document.getElementById('tag-name');
        this.statusBadge = document.getElementById('status-badge');
        this.description = document.getElementById('description');
        this.example = document.getElementById('example');
        this.note = document.getElementById('note');
        this.currentCardSpan = document.querySelector('.current-card');
        this.totalCardsSpan = document.querySelector('.total-cards');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.flipBtn = document.getElementById('flip-btn');
        this.dotsContainer = document.getElementById('dots');
        
        // Set total cards
        this.totalCardsSpan.textContent = this.flashcards.length;
        
        // Make flashcard focusable
        this.flashcard.setAttribute('tabindex', '0');
    }

    setupEventListeners() {
        // Card flip on click - use event delegation to ensure it works
        this.flashcard.addEventListener('click', () => {
            console.log('Card clicked, flipping...');
            this.flipCard();
        });
        
        // Keyboard support for card flip
        this.flashcard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.flipCard();
            }
        });
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            console.log('Previous button clicked');
            this.previousCard();
        });
        
        this.nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            this.nextCard();
        });
        
        this.flipBtn.addEventListener('click', () => {
            console.log('Flip button clicked');
            this.flipCard();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousCard();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextCard();
            }
        });
    }

    createDotIndicators() {
        this.dotsContainer.innerHTML = '';
        
        this.flashcards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('data-index', index);
            
            dot.addEventListener('click', () => {
                console.log('Dot clicked, going to card', index);
                this.goToCard(index);
            });
            
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', `Go to card ${index + 1}`);
            
            // Keyboard support for dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToCard(index);
                }
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }

    flipCard() {
        console.log('Flipping card, current state:', this.isFlipped);
        this.isFlipped = !this.isFlipped;
        
        if (this.isFlipped) {
            this.flashcard.classList.add('flipped');
            this.flipBtn.textContent = 'Flip Back 🔄';
            console.log('Card flipped to back');
        } else {
            this.flashcard.classList.remove('flipped');
            this.flipBtn.textContent = 'Flip Card 🔄';
            console.log('Card flipped to front');
        }
    }

    loadCard(index) {
        console.log('Loading card', index);
        this.currentCardIndex = index;
        
        // Reset flip state when changing cards
        if (this.isFlipped) {
            this.isFlipped = false;
            this.flashcard.classList.remove('flipped');
            this.flipBtn.textContent = 'Flip Card 🔄';
        }
        
        const card = this.flashcards[this.currentCardIndex];
        
        // Update content
        this.tagName.innerHTML = card.front;
        this.description.innerHTML = card.description;
        this.example.innerHTML = card.example;
        this.note.innerHTML = card.note;
        
        // Update status badge
        this.statusBadge.textContent = card.status;
        this.statusBadge.className = 'status-badge ' + card.status.toLowerCase();
        
        // Update progress and navigation
        this.updateProgress();
        this.updateNavigationButtons();
        this.updateDotIndicators();
        
        // Add changing animation
        const container = document.querySelector('.flashcard-container');
        container.classList.add('changing');
        setTimeout(() => {
            container.classList.remove('changing');
        }, 150);
    }

    updateProgress() {
        console.log('Updating progress to', this.currentCardIndex + 1);
        this.currentCardSpan.textContent = this.currentCardIndex + 1;
    }

    updateNavigationButtons() {
        // Update navigation buttons
        const isFirstCard = this.currentCardIndex === 0;
        const isLastCard = this.currentCardIndex === this.flashcards.length - 1;
        
        this.prevBtn.disabled = isFirstCard;
        this.nextBtn.disabled = isLastCard;
        
        // Update button styles for disabled state
        if (isFirstCard) {
            this.prevBtn.style.opacity = '0.5';
            this.prevBtn.style.cursor = 'not-allowed';
        } else {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
        }
        
        if (isLastCard) {
            this.nextBtn.style.opacity = '0.5';
            this.nextBtn.style.cursor = 'not-allowed';
        } else {
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        }
        
        console.log('Navigation updated - prev disabled:', isFirstCard, 'next disabled:', isLastCard);
    }

    updateDotIndicators() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentCardIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    previousCard() {
        if (this.currentCardIndex > 0) {
            console.log('Going to previous card');
            this.loadCard(this.currentCardIndex - 1);
        }
    }

    nextCard() {
        if (this.currentCardIndex < this.flashcards.length - 1) {
            console.log('Going to next card');
            this.loadCard(this.currentCardIndex + 1);
        }
    }

    goToCard(index) {
        if (index >= 0 && index < this.flashcards.length && index !== this.currentCardIndex) {
            console.log('Going to card', index);
            this.loadCard(index);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    new FlashcardApp();
});

// Add some visual feedback for interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add click feedback to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }
        });
    });
});