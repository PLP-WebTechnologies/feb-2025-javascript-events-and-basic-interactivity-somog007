// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.style.color = '#4a6fa5';
        clickOutput.style.fontWeight = 'bold';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
            clickOutput.style.fontWeight = '';
        }, 2000);
    });
    
    // Hover effect
    const hoverBox = document.getElementById('hover-box');
    const hoverEffect = document.getElementById('hover-effect');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverEffect.style.backgroundColor = '#4a6fa5';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverEffect.style.backgroundColor = '#e0e0e0';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
    });
    
    // Secret double click
    // Secret double click
const secretBox = document.getElementById('secret-box');
const doubleClickOutput = document.getElementById('double-click-output');

secretBox.addEventListener('dblclick', function () {
    this.textContent = 'You found the secret! 🎉';
    this.classList.add('rainbow');

    // Update the double-click output
    doubleClickOutput.textContent = '🎉 Secret revealed successfully!';
    doubleClickOutput.style.color = 'green';
    doubleClickOutput.style.fontWeight = 'bold';

    // Reset after 3 seconds
    setTimeout(() => {
        this.textContent = 'Double click me for a secret!';
        this.classList.remove('rainbow');

        // Reset the double-click output
        doubleClickOutput.textContent = 'No secret revealed yet';
        doubleClickOutput.style.color = '';
        doubleClickOutput.style.fontWeight = '';
    }, 3000);
});
    
    // ========== Interactive Elements ==========
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#4a6fa5', '#28a745', '#dc3545', '#fd7e14', '#6f42c1'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });
    
    // Image gallery
    const galleryImage = document.getElementById('gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const images = [
        'https://picsum.photos/id/10/600/400',
        'https://picsum.photos/id/11/600/400',
        'https://picsum.photos/id/12/600/400',
        'https://picsum.photos/id/13/600/400',
        'https://picsum.photos/id/14/600/400'
    ];
    let currentImageIndex = 0;
    
    function updateGalleryImage() {
        galleryImage.src = images[currentImageIndex];
        galleryImage.alt = `Gallery image ${currentImageIndex + 1}`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 500);
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            
            // Calculate password strength
            let strength = 0;
            if (passwordInput.value.length >= 8) strength += 1;
            if (/[A-Z]/.test(passwordInput.value)) strength += 1;
            if (/[0-9]/.test(passwordInput.value)) strength += 1;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 1;
            
            // Update strength bar
            const width = strength * 25;
            strengthBar.style.width = `${width}%`;
            
            // Update strength text and color
            const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            strengthText.textContent = strengthLabels[strength];
            
            const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#218838'];
            strengthBar.style.backgroundColor = colors[strength];
            
            return true;
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // Form is valid - show success message
            formSuccess.style.display = 'block';
            form.reset();
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Password strength';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
});