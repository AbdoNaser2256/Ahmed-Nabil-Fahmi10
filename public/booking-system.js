// Booking Form and WhatsApp Chat System
(function() {
    'use strict';

    const WHATSAPP_NUMBER = '201111140404'; // Format: country code + number without +

    // Create Booking Form Modal
    function createBookingModal() {
        const modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-overlay"></div>
            <div class="booking-modal-content">
                <button class="booking-modal-close" aria-label="Close">&times;</button>
                <h2 class="booking-modal-title">Book Your Appointment</h2>
                <p class="booking-modal-subtitle">Fill in your details and we'll contact you via WhatsApp</p>
                
                <form id="booking-form" class="booking-form">
                    <div class="form-group">
                        <label for="fullName">Full Name *</label>
                        <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="age">Age *</label>
                            <input type="number" id="age" name="age" required min="1" max="120" placeholder="Your age">
                        </div>

                        <div class="form-group">
                            <label for="citizenship">Citizenship *</label>
                            <select id="citizenship" name="citizenship" required>
                                <option value="Egypt">Egypt</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="UAE">UAE</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Oman">Oman</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+20 XXX XXX XXXX">
                    </div>

                    <div class="form-group">
                        <label for="phone2">Second Phone Number (Optional)</label>
                        <input type="tel" id="phone2" name="phone2" placeholder="+20 XXX XXX XXXX">
                    </div>

                    <div class="form-group">
                        <label for="visitType">Visit Type *</label>
                        <select id="visitType" name="visitType" required>
                            <option value="">Select visit type</option>
                            <option value="First Time">First Time Visit</option>
                            <option value="Second Time">Second Time Visit</option>
                            <option value="Regular Patient">Regular Patient</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="notes">Additional Notes</label>
                        <textarea id="notes" name="notes" rows="4" placeholder="Any specific concerns or requests..."></textarea>
                    </div>

                    <button type="submit" class="booking-submit-btn">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Send to WhatsApp
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal handlers
        const closeBtn = modal.querySelector('.booking-modal-close');
        const overlay = modal.querySelector('.booking-modal-overlay');
        
        closeBtn.addEventListener('click', () => closeBookingModal());
        overlay.addEventListener('click', () => closeBookingModal());

        // Form submission
        const form = modal.querySelector('#booking-form');
        form.addEventListener('submit', handleBookingSubmit);
    }

    // Create WhatsApp Chat Widget
    function createWhatsAppWidget() {
        const widget = document.createElement('div');
        widget.id = 'whatsapp-widget';
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-widget-content">
                <div class="whatsapp-widget-header">
                    <div class="whatsapp-widget-avatar">
                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </div>
                    <div class="whatsapp-widget-info">
                        <h3>Prof. Dr Ahmed Nabil</h3>
                        <p>Typically replies instantly</p>
                    </div>
                    <button class="whatsapp-widget-close" aria-label="Close">&times;</button>
                </div>
                <div class="whatsapp-widget-body">
                    <div class="whatsapp-widget-message">
                        <p>Hello! 👋</p>
                        <p>How can we help you today?</p>
                    </div>
                </div>
                <div class="whatsapp-widget-footer">
                    <textarea id="whatsapp-message" placeholder="Type your message..." rows="2"></textarea>
                    <button id="whatsapp-send-btn" class="whatsapp-send-btn">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        // Close widget handler
        const closeBtn = widget.querySelector('.whatsapp-widget-close');
        closeBtn.addEventListener('click', () => closeWhatsAppWidget());

        // Send message handler
        const sendBtn = widget.querySelector('#whatsapp-send-btn');
        const textarea = widget.querySelector('#whatsapp-message');
        
        sendBtn.addEventListener('click', () => sendWhatsAppMessage());
        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendWhatsAppMessage();
            }
        });
    }

    // Open/Close Functions
    function openBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeBookingModal() {
        const modal = document.getElementById('booking-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function openWhatsAppWidget() {
        const widget = document.getElementById('whatsapp-widget');
        if (widget) {
            widget.classList.add('active');
        }
    }

    function closeWhatsAppWidget() {
        const widget = document.getElementById('whatsapp-widget');
        if (widget) {
            widget.classList.remove('active');
        }
    }

    // Handle booking form submission
    function handleBookingSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            fullName: formData.get('fullName'),
            age: formData.get('age'),
            citizenship: formData.get('citizenship'),
            phone: formData.get('phone'),
            phone2: formData.get('phone2'),
            visitType: formData.get('visitType'),
            notes: formData.get('notes')
        };

        // Format WhatsApp message
        let message = `*New Appointment Request*\n\n`;
        message += `*Name:* ${data.fullName}\n`;
        message += `*Age:* ${data.age}\n`;
        message += `*Citizenship:* ${data.citizenship}\n`;
        message += `*Phone:* ${data.phone}\n`;
        if (data.phone2) {
            message += `*Second Phone:* ${data.phone2}\n`;
        }
        message += `*Visit Type:* ${data.visitType}\n`;
        if (data.notes) {
            message += `*Notes:* ${data.notes}\n`;
        }

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');

        // Close modal and reset form
        closeBookingModal();
        e.target.reset();
    }

    // Send WhatsApp message from chat widget
    function sendWhatsAppMessage() {
        const textarea = document.getElementById('whatsapp-message');
        const message = textarea.value.trim();
        
        if (message) {
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
            
            textarea.value = '';
            closeWhatsAppWidget();
        }
    }

    // Initialize on page load
    function init() {
        // Create modals
        createBookingModal();
        createWhatsAppWidget();

        // Find and attach to all CTA buttons
        const ctaButtons = document.querySelectorAll('button:not(#whatsapp-send-btn):not(.whatsapp-widget-close):not(.booking-modal-close)');
        ctaButtons.forEach(button => {
            const text = button.textContent.toLowerCase();
            
            // Check if it's a gallery/case studies button - link to before-after page
            if (text.includes('case') || 
                text.includes('studies') || 
                text.includes('gallery') || 
                text.includes('galleries') || 
                text.includes('before') || 
                text.includes('after')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = '/before-after.html';
                });
            }
            // Check for various CTA keywords - open booking form
            else if (text.includes('book') || 
                text.includes('appointment') || 
                text.includes('consultation') || 
                text.includes('schedule') || 
                text.includes('consult') || 
                text.includes('start') || 
                text.includes('journey') || 
                text.includes('contact') || 
                text.includes('request') || 
                text.includes('talk') || 
                text.includes('specialist') || 
                text.includes('call') ||
                text.includes('now')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    openBookingModal();
                });
            }
        });

        // Update floating WhatsApp button
        const floatingWhatsApp = document.querySelector('a[href*="wa.me"]');
        if (floatingWhatsApp) {
            floatingWhatsApp.addEventListener('click', (e) => {
                e.preventDefault();
                openWhatsAppWidget();
            });
        }

        // Handle home page booking form
        const homeForm = document.getElementById('home-booking-form');
        if (homeForm) {
            homeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const data = {
                    fullName: formData.get('fullName'),
                    age: formData.get('age'),
                    citizenship: formData.get('citizenship'),
                    phone: formData.get('phone'),
                    visitType: formData.get('visitType')
                };

                // Format WhatsApp message
                let message = `*New Appointment Request*\n\n`;
                message += `*Name:* ${data.fullName}\n`;
                message += `*Age:* ${data.age}\n`;
                message += `*Citizenship:* ${data.citizenship}\n`;
                message += `*Phone:* ${data.phone}\n`;
                message += `*Visit Type:* ${data.visitType}\n`;

                // Encode and open WhatsApp
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
                window.open(whatsappURL, '_blank');

                // Reset form
                e.target.reset();
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
