// DOM Elements
const newFeedingBtn = document.getElementById('newFeedingBtn');
const feedingForm = document.getElementById('feedingForm');
const cancelFeedingBtn = document.getElementById('cancelFeedingBtn');
const feedingRecordForm = document.getElementById('feedingRecordForm');

// Toggle form visibility
if (newFeedingBtn && feedingForm && cancelFeedingBtn) {
    newFeedingBtn.addEventListener('click', () => {
        feedingForm.classList.remove('hidden');
        newFeedingBtn.classList.add('hidden');
    });

    cancelFeedingBtn.addEventListener('click', () => {
        feedingForm.classList.add('hidden');
        newFeedingBtn.classList.remove('hidden');
        feedingRecordForm.reset();
    });
}

// Form submission handler
if (feedingRecordForm) {
    feedingRecordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const cattleId = e.target[0].value;
        const feedType = e.target[1].value;
        const quantity = e.target[2].value;
        const time = e.target[3].value;
        const notes = e.target[4].value;
        
        // Basic validation
        if (!cattleId || !feedType || !quantity || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create feeding record object
        const feedingRecord = {
            id: Date.now().toString(),
            cattleId,
            feedType,
            quantity: parseFloat(quantity),
            time,
            notes,
            recordedAt: new Date().toISOString(),
            recordedBy: JSON.parse(localStorage.getItem('dairyFarmUser')).name || 'Unknown'
        };
        
        // Save to localStorage
        saveFeedingRecord(feedingRecord);
        
        // Reset form and hide
        feedingRecordForm.reset();
        feedingForm.classList.add('hidden');
        newFeedingBtn.classList.remove('hidden');
        
        // Show success message
        alert('Feeding record saved successfully!');
        
        // In a real app, you would update the UI here
        // or redirect to refresh the data
    });
}

// Save feeding record to localStorage
function saveFeedingRecord(record) {
    let records = JSON.parse(localStorage.getItem('feedingRecords')) || [];
    records.push(record);
    localStorage.setItem('feedingRecords', JSON.stringify(records));
}

// Load feeding records (would be called when page loads)
function loadFeedingRecords() {
    const records = JSON.parse(localStorage.getItem('feedingRecords')) || [];
    // In a real app, you would use this data to populate the tables
    return records;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = localStorage.getItem('dairyFarmUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load existing records
    loadFeedingRecords();
    
    // In a real app, you would also:
    // 1. Fetch cattle data for the dropdown
    // 2. Populate the tables with actual data
    // 3. Set up event listeners for edit/delete buttons
});