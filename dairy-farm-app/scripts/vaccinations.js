// DOM Elements
const newVaccinationBtn = document.getElementById('newVaccinationBtn');
const vaccinationForm = document.getElementById('vaccinationForm');
const cancelVaccinationBtn = document.getElementById('cancelVaccinationBtn');
const vaccinationRecordForm = document.getElementById('vaccinationRecordForm');

// Toggle form visibility
if (newVaccinationBtn && vaccinationForm && cancelVaccinationBtn) {
    newVaccinationBtn.addEventListener('click', () => {
        vaccinationForm.classList.remove('hidden');
        newVaccinationBtn.classList.add('hidden');
    });

    cancelVaccinationBtn.addEventListener('click', () => {
        vaccinationForm.classList.add('hidden');
        newVaccinationBtn.classList.remove('hidden');
        vaccinationRecordForm.reset();
    });
}

// Form submission handler
if (vaccinationRecordForm) {
    vaccinationRecordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const cattleId = e.target[0].value;
        const vaccineType = e.target[1].value;
        const dateAdministered = e.target[2].value;
        const nextDoseDue = e.target[3].value;
        const batchNumber = e.target[4].value;
        const administeredBy = e.target[5].value;
        const notes = e.target[6].value;
        
        // Basic validation
        if (!cattleId || !vaccineType || !dateAdministered || !administeredBy) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create vaccination record object
        const vaccinationRecord = {
            id: Date.now().toString(),
            cattleId,
            vaccineType,
            dateAdministered,
            nextDoseDue: nextDoseDue || null,
            batchNumber: batchNumber || 'N/A',
            administeredBy,
            notes: notes || '',
            recordedAt: new Date().toISOString(),
            recordedBy: JSON.parse(localStorage.getItem('dairyFarmUser')).name || 'Unknown'
        };
        
        // Save to localStorage
        saveVaccinationRecord(vaccinationRecord);
        
        // Reset form and hide
        vaccinationRecordForm.reset();
        vaccinationForm.classList.add('hidden');
        newVaccinationBtn.classList.remove('hidden');
        
        // Show success message
        alert('Vaccination record saved successfully!');
        
        // In a real app, you would update the UI here
    });
}

// Save vaccination record to localStorage
function saveVaccinationRecord(record) {
    let records = JSON.parse(localStorage.getItem('vaccinationRecords')) || [];
    records.push(record);
    localStorage.setItem('vaccinationRecords', JSON.stringify(records));
}

// Load vaccination records (would be called when page loads)
function loadVaccinationRecords() {
    const records = JSON.parse(localStorage.getItem('vaccinationRecords')) || [];
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
    loadVaccinationRecords();
    
    // In a real app, you would also:
    // 1. Fetch cattle data for the dropdown
    // 2. Populate the tables with actual data
    // 3. Set up event listeners for edit/delete buttons
    // 4. Implement upcoming vaccination alerts
});