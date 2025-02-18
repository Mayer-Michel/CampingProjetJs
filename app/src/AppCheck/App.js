// Import de la feuille de style
import '../assets/css/style.css';
import { Table } from './Table';
import { TableService } from './Services/TableService';

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent du constructeur privé en PHP
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

        // rendu de l'interface Utilisateur
        this.hebergementList();

        this.renderBaseUI();

        this.renderList();
    }

    /**
     *  récuperation des données
     */
    hebergementList() {
        console.log('Rendu de l\'interface utilisateur ...');

        // On crée une instance de TableService
        const tableService = new TableService();

        // On appelle la méthode fetchAndSaveAll
        tableService.fetchAndSaveAll();

        // On appelle la méthode getAll
        const reservations = tableService.getAll();

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
                    <input type="checkbox" ${reservation.cleaned ? 'checked' : ''} data-id="${reservation.id}">
                </td>
            `;

            // Ajout d'un écouteur d'événements sur la case à cocher
            const checkbox = row.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (event) => {
                this.updateCleaningStatus(reservation.id, event.target.checked);
            });

            tbody.append(row);
        }
    }

    /**
     * 
     * @param {} id 
     * @param {*} isCleaned 
     */
    updateCleaningStatus(id, isCleaned) {
        const reservations = this.tableService.getAll();

        // Find the reservation and update it
        const updatedReservations = reservations.map(reservation => 
            reservation.id === id ? { ...reservation, cleaned: isCleaned } : reservation
        );

        // Save updated data
        this.tableService.saveAll(updatedReservations);
    }
    

}


// On crée une instance de App dans une variable
// La variable est l'équivalent de la propriété statique "$instance" en PHP
const app = new App();
// On exporte cette variable.
// Si à l'extérieur il y a plusieurs imports de cette variable,
// le système aura mémorisé le premier, et pour les suivants donnera ce qui a été mémorisé
// C'est l'équivalent de la méthode statique "getApp" en PHP
export default app;