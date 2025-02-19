// Import de la feuille de style
import '../assets/css/style.css';
import { Table } from './Table';
import { TableService } from './Services/TableService';

class App {
    constructor() {
        this.table = new Table(); // Create table instance
        this.tableService = new TableService();
    }

    /**
     * Démarreur de l'application
     */
    start() {
        console.log('Application démarrée ...');
        this.hebergementList();
        this.renderBaseUI();
        this.renderList();
    }

    /**
     * Récupération des données
     */
    hebergementList() {
        console.log('Rendu de l\'interface utilisateur ...');
        const tableService = new TableService();
        tableService.fetchAndSaveAll();  // Fetch data and save it
        const reservations = tableService.getAll();  // Get all the reservations
        console.log('reservations:', reservations);
    }

    /**
     * Affiche la base de l'interface
     */
    renderBaseUI() {
        const elHeader = document.createElement('header');
        elHeader.innerHTML = `<h1>Reservations</h1>`;
        const elMain = document.createElement('main');
        elMain.append(this.table.getDOM());
        document.body.append(elHeader, elMain);
    }

    /**
     * Affiche les réservations dans le tableau
     */
    renderList() {
        const tbody = this.table.getTbody();
        if (!tbody) return console.error('TBody not found!');

        this.table.clearTable(); // Clear existing rows
        const reservations = this.tableService.getAll();

        for (let reservation of reservations) {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${reservation.username}</td>
                <td>${reservation.hebergementType}</td>
                <td>${reservation.dateStart}</td>
                <td>${reservation.dateEnd}</td>
                <td>
                    <input type="checkbox" ${reservation.clean ? 'checked' : ''} data-id="${reservation.id}">
                </td>
            `;

            // Add event listener to the checkbox
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (event) => {
                const id = event.target.getAttribute('data-id');
                const isCleaned = event.target.checked;
                this.updateCleaningStatus(id, isCleaned); // Pass the ID here
            });

            tbody.append(row);
        }
    }

    /**
 * Handle checkbox change event
 * @param {Event} event
 */
    handleCheckboxChange(event) {
        const checkbox = event.target;
        const id = checkbox.dataset.id;  // Get the reservation ID from the checkbox
        console.log('Checkbox ID:', id); // Log the ID

        if (!id) {
            console.error('No reservation ID found!');
            return;
        }

        const isCleaned = checkbox.checked;

        // Update the cleaning status both in the frontend (DOM) and the backend
        this.updateCleaningStatus(id, isCleaned);

        // Optionally, send the updated data to the backend (API call)
        this.sendCleaningStatusToBackend(id, isCleaned);
    }


    /**
     * Envoie la mise à jour du statut de nettoyage au backend
     * @param {number} id ID de la réservation
     * @param {boolean} isCleaned Statut de nettoyage 
     */
    updateCleaningStatus(id, isCleaned) {
        const data = { clean: isCleaned };
    
        fetch(`http://localhost:8001/api/reservations/${id}/clean`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

// Créer une instance de App
const app = new App();
export default app;