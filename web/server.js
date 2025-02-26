const express = require('express');
const { Client } = require('pg');
const fs = require('fs');

const app = express();
const port = 3000;

const dbHost = 'db';
const dbUser = 'user';
const dbPassword = 'password';
const dbName = 'database';

const dbClient = new Client({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

function connectToDatabase() {
  dbClient.connect(err => {
    if (err) {
      console.error('Erreur de connexion à la base de données : ', err);
      logToFile('Erreur de connexion à la base de données : ' + err.message);
      setTimeout(connectToDatabase, 5000);
    } else {
      console.log('Connexion réussie à la base de données');
      logToFile('Connexion réussie à la base de données');
    }
  });
}

connectToDatabase();

function logToFile(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync('./logs/app.log', logMessage);
}

app.get('/test-db', (req, res) => {
  dbClient.query('SELECT NOW()', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur de connexion à la base de données' });
      logToFile('Erreur lors de la requête à la base de données : ' + err.message);
    } else {
      res.status(200).json({ message: 'Base de données connectée avec succès', time: result.rows[0] });
      logToFile('Requête réussie à la base de données : ' + JSON.stringify(result.rows[0]));
    }
  });
});

app.get('/', (req, res) => {
  res.send('API Express fonctionne avec PostgreSQL!');
});

app.listen(port, () => {
  console.log(`API en écoute sur http://localhost:${port}`);
});
