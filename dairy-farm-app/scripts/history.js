// DOM Elements
const historyFilters = document.getElementById('historyFilters');
const exportHistoryBtn = document.getElementById('exportHistoryBtn');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = localStorage.getItem('dairyFarmUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Load and display history data
    loadHistoryData();
});

// Load history data from localStorage
function loadHistoryData() {
    // In a real app, you would combine data from:
    // 1. Feeding records (localStorage.getItem('feedingRecords'))
    // 2. Vaccination records (localStorage.getItem('vaccinationRecords'))
    // 3. Other activity records
    
    // For demo purposes, we'll use mock data
    const mockData = [
        {
            type: 'feeding',
            date: new Date().toISOString(),
            cattleId: 'DF-0142',
            details: '20kg of Alfalfa',
            recordedBy: 'John D.'
        },
        {
            type: 'vaccination',
            date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            cattleId: 'DF-0038',
            details: 'Brucellosis vaccine',
            recordedBy: 'Sarah M.'
        },
        {
            type: 'health',
            date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            cattleId: 'DF-0092',
            details: 'Normal temperature',
            recordedBy: 'John D.'
        },
        {
            type: 'vaccination',
            date: '2023-10-10T00:00:00Z',
            cattleId: 'DF-0142',
            details: 'IBR vaccine',
            recordedBy: 'Dr. Smith'
        },
        {
            type: 'feeding',
            date: '2023-10-05T00:00:00Z',
            cattleId: 'DF-0038',
            details: '15kg of Corn Silage',
            recordedBy: 'Sarah M.'
        }
    ];

    // In a real app, you would:
    // 1. Process the data
    // 2. Apply filters
    // 3. Render to the table
}

// Handle filter form submission
if (historyFilters) {
    historyFilters.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get filter values
        const activityType = e.target[0].value;
        const dateFrom = e.target[1].value;
        const dateTo = e.target[2].value;
        const cattleId = e.target[3].value;
        
        // In a real app, you would:
        // 1. Filter the data based on these values
        // 2. Update the table display
        // 3. Update pagination
        
        alert('Filters applied (demo mode)');
    });
}

// Handle export to CSV
if (exportHistoryBtn) {
    exportHistoryBtn.addEventListener('click', () => {
        // In a real app, you would:
        // 1. Get the filtered data
        // 2. Convert to CSV format
        // 3. Trigger download
        
        // Demo implementation
        const csvContent = "data:text/csv;charset=utf-8," +
            "Date,Activity,Cattle ID,Details,Recorded By\n" +
            "2023-11-01 08:30,Feeding,DF-0142,20kg of Alfalfa,John D.\n" +
            "2023-10-31 16:45,Vaccination,DF-0038,Brucellosis vaccine,Sarah M.\n" +
            "2023-10-31 10:15,Health Check,DF-0092,Normal temperature,John D.\n" +
            "2023-10-10 00:00,Vaccination,DF-0142,IBR vaccine,Dr. Smith\n" +
            "2023-10-05 00:00,Feeding,DF-0038,15kg of Corn Silage,Sarah M.";
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dairy_farm_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}