const STORAGE_NAME = 'reservations-data';

export class TableService {
    /**
     * Fetch reservations from API and store in localStorage
     */
    async fetchAndSaveAll() {
        console.log('Fetching reservations...');

        try {
            const response = await fetch('http://localhost:8083/api/reservations');
            
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }

            const data = await response.json();

            // Store data in localStorage
            this.saveAll(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    }

    /**
     * CRUD: Read All from localStorage
     */
    getAll() {
        let result = [];

        console.log('Reading reservations from localStorage...');

        const serializedData = localStorage.getItem(STORAGE_NAME);

        if (serializedData === null) return result;

        try {
            result = JSON.parse(serializedData);
        } catch (e) {
            console.error('Data corruption detected, clearing localStorage');
            localStorage.removeItem(STORAGE_NAME);
        }

        return result;
    }

    /**
     * CRUD: Save All to localStorage
     */
    saveAll(arrData) {
        console.log('Saving reservations to localStorage...');

        try {
            const serializedData = JSON.stringify(arrData);
            localStorage.setItem(STORAGE_NAME, serializedData);
            return true;
        } catch (e) {
            console.error('Error saving reservations:', e);
            return false;
        }
    }

    /**
     * refresh and render the list
     */
    fetchAndRender() {
        const tableService = new TableService();
        tableService.fetchAndSaveAll().then(() => {
            this.renderList();
        });
    }
}