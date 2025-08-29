let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

const serviceData = {
    'emergency': { title: 'National Emergency Number', number: '999' },
    'police': { title: 'Police Helpline Number', number: '999' },
    'fire': { title: 'Fire Service Number', number: '999' },
    'ambulance': { title: 'Ambulance Service', number: '1994-999999' },
    'women': { title: 'Women & Child Helpline', number: '109' },
    'corruption': { title: 'Anti-Corruption Helpline', number: '106' },
    'electricity': { title: 'Electricity Helpline', number: '16216' },
    'brac': { title: 'Brac Helpline', number: '16445' },
    'railway': { title: 'Bangladesh Railway Helpline', number: '163' }
};

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
    
    // Copy functionality for all services
    services.forEach(serviceId => {
        const copyBtn = document.getElementById(`copy-${serviceId}`);
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const number = serviceData[serviceId].number;
                navigator.clipboard.writeText(number).then(() => {
                    copyCount++;
                    updateCopyCount();
                    
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fa-solid fa-check text-sm"></i> Copied';
                    this.classList.add('bg-green-100', 'border-green-300');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('bg-green-100', 'border-green-300');
                    }, 1500);
                });
            });
        }
    });
    
    // Call functionality for all services
    services.forEach(serviceId => {
        const callBtn = document.getElementById(`call-${serviceId}`);
        if (callBtn) {
            callBtn.addEventListener('click', function() {
                const title = serviceData[serviceId].title;
                const number = serviceData[serviceId].number;
                
                if (coinCount >= 20) {
                    coinCount -= 20;
                    updateCoinCount();
                    addToCallHistory(title, number);
                    
                    alert(`Calling ${title}: ${number}`);
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fa-solid fa-phone-volume text-sm"></i> Calling...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                    }, 800);
                } else {
                    alert('Insufficient coins! You need at least 20 coins to make a call.');
                }
            });
        }
    });
    
    // Update counter functions
    function updateHeartCount() {
        const heartCountEl = document.getElementById('heart-count');
        if (heartCountEl) heartCountEl.textContent = heartCount;
    }
    
    function updateCoinCount() {
        const coinCountEl = document.getElementById('coin-count');
        if (coinCountEl) coinCountEl.textContent = coinCount;
    }
    
    function updateCopyCount() {
        const copyCountEl = document.getElementById('copy-count');
        if (copyCountEl) copyCountEl.textContent = `${copyCount} Copy`;
    }
    
    // Call history functions
    function addToCallHistory(title, number) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        const historyItem = { title, number, time: timeString };
        callHistory.unshift(historyItem);
        
        if (callHistory.length > 10) {
            callHistory = callHistory.slice(0, 10);
        }
        
        updateCallHistory();
    }
    
    function updateCallHistory() {
        const historyList = document.getElementById('call-history-list');
        if (!historyList) return;
        
        if (callHistory.length === 0) {
            historyList.innerHTML = `
                <div class="text-center text-gray-500 text-sm py-8">
                    <i class="fa-solid fa-clock-rotate-left text-2xl mb-2 block"></i>
                    No call history yet.
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = callHistory.map(item => `
            <div class="bg-gray-50 rounded-lg p-3">
                <div class="flex justify-between items-start mb-1">
                    <h4 class="font-medium text-sm text-gray-800">${item.title}</h4>
                    <span class="text-xs text-gray-500">${item.time}</span>
                </div>
                <p class="text-xs text-gray-600">${item.number}</p>
            </div>
        `).join('');
    }
    
    // Clear history functionality
    const clearBtn = document.getElementById('clear-history');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            callHistory = [];
            updateCallHistory();
        })
    }
    updateCallHistory();
});
