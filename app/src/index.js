// avec webpack, la précision ".js" n'est pas obligatoire
// "app" n'est pas entre accolades, car il est en "export default"
// Les accolades sont utilisées pour les "export" tout-court, pour gérer le cas où il y en a plusieurs 
import app from './AppCheck/App';

app.start();