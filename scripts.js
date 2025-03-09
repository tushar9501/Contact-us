document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
});

function validateForm() {
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name.trim() === '' || email.trim() === '' || mobile.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Mobile number validation
    const mobileRegex = /^\d+$/;
    if (!mobileRegex.test(mobile)) {
        alert('Please enter a valid mobile number');
        return false;
    }

    alert('Form submitted successfully!');
    document.getElementById('contactForm').reset();
    return false;
}