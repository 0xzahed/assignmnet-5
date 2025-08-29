let heartCount = 0;
let coinCount = 100;

const services = Object.keys(serviceData);

document.addEventListener('DOMContentLoaded', function() {
    
    // Heart functionality for all services 
    services.forEach(serviceId => {
        const heartBtn = document.getElementById(`heart-${serviceId}`);
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-regular')) {
                    icon.classList.remove('fa-regular', 'text-gray-300');
                    icon.classList.add('fa-solid', 'text-red-500');
                    heartCount++;
                } else {
                    icon.classList.remove('fa-solid', 'text-red-500');
                    icon.classList.add('fa-regular', 'text-gray-300');
                    heartCount++;
                }
                updateHeartCount();
            });
        }
    });
    

    // Update counter functions
    function updateHeartCount() {
        const heartCountEl = document.getElementById('heart-count');
        if (heartCountEl) heartCountEl.textContent = heartCount;
    }
});
