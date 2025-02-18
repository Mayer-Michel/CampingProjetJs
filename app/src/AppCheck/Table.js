export class Table {
    /**
     * Élément DOM de la table
     */
    elTable = null;

    /**
     * Élément DOM du corps de la table
     */
    elTbody = null;

    constructor() {
        this.elTable = this.createTableDOM();
    }

    /**
     * Créé le DOM de la table
     * @returns {HTMLElement} Élément table
     */
    createTableDOM() {
        const table = document.createElement('table');
        table.classList.add('reservation-table');

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Hébergement</th>
                    <th>Date d'arrivée</th>
                    <th>Date de départ</th>
                    <th>Nettoyé</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // Récupération du <tbody> pour une future utilisation
        this.elTbody = table.querySelector('tbody');

        return table;
    }

    /**
     * Retourne le DOM de la table
     * @returns {HTMLElement} Élément DOM de la table
     */
    getDOM() {
        return this.elTable;
    }

    /**
     * Retourne l'élément tbody pour l'ajout des lignes
     * @returns {HTMLElement} Élément tbody de la table
     */
    getTbody() {
        return this.elTbody;
    }

    /**
     * Vide le contenu du tbody
     */
    clearTable() {
        if (this.elTbody) {
            this.elTbody.innerHTML = '';
        }
    }
}