// Import de la feuille de style
import '../assets/css/style.css';
import { TableService } from './Services/TableService';

// La class n'est pas exportée, ce qui empêche de l'importer et de l'instancier
// C'est l'équivalent du constructeur privé en PHP
class App {
    /**
     * Démarreur de l'application
     */
    start() {
        console.log( 'Application démarrée ...' );

        // rendu de l'interface Utilisateur
        this.renderBaseUI();
    }

    /**
     * Rendu de l'interface utilisateur
     */
    renderBaseUI() {
        console.log( 'Rendu de l\'interface utilisateur ...' );

        // On crée une instance de TableService
        const tableService = new TableService();

        // On appelle la méthode fetchAndSaveAll
        tableService.fetchAndSaveAll();

        // On appelle la méthode getAll
        const reservations = tableService.getAll();

        console.log( 'reservations:', reservations );
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