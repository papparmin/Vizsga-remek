const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // Jelszó titkosításhoz
const jwt = require('jsonwebtoken'); // Token generáláshoz

const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'nagyon_titkos_kulcs_a_vizsgahoz'; // Ezt élesben sosem így tároljuk, de ide most jó

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'exploree',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) console.error('❌ Hiba az adatbázis csatlakozásakor:', err.message);
    else { console.log('✅ Sikeresen csatlakozva az adatbázishoz!'); connection.release(); }
});

// --- API VÉGPONTOK ---

app.get('/api/status', (req, res) => res.json({ message: 'Backend fut!' }));

// 1. REGISZTRÁCIÓ
app.post('/api/register', async (req, res) => {
    // Megkapjuk az adatokat a frontendről (AuthModal.jsx)
    const { firstName, lastName, email, password } = req.body;
    
    // Összefűzzük a nevet, mert az adatbázisban csak egy 'nev' mező van
    const fullName = `${lastName} ${firstName}`;

    try {
        // Ellenőrizzük, létezik-e már az email
        db.query('SELECT * FROM felhasznalok WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Adatbázis hiba' });
            if (results.length > 0) return res.status(400).json({ error: 'Ez az e-mail cím már foglalt!' });

            // Jelszó titkosítása (hash)
            const hashedPassword = await bcrypt.hash(password, 10);

            // Új felhasználó beszúrása
            db.query('INSERT INTO felhasznalok (nev, email, jelszo) VALUES (?, ?, ?)', 
            [fullName, email, hashedPassword], 
            (insertErr, result) => {
                if (insertErr) return res.status(500).json({ error: 'Hiba a mentés során' });
                res.status(201).json({ message: 'Sikeres regisztráció!' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Szerver hiba' });
    }
});

// 2. BEJELENTKEZÉS
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM felhasznalok WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Adatbázis hiba' });
        if (results.length === 0) return res.status(401).json({ error: 'Hibás e-mail vagy jelszó!' });

        const user = results[0];

        // Ellenőrizzük a titkosított jelszót
        const isMatch = await bcrypt.compare(password, user.jelszo);
        if (!isMatch) return res.status(401).json({ error: 'Hibás e-mail vagy jelszó!' });

        // Token generálása (1 napig érvényes)
        const token = jwt.sign({ id: user.id, role: user.szerepkor }, JWT_SECRET, { expiresIn: '1d' });

        // Visszaküldjük a tokent és a felhasználó nevét
        res.json({ 
            message: 'Sikeres belépés!',
            token: token,
            user: { nev: user.nev, email: user.email, szerepkor: user.szerepkor }
        });
    });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Backend szerver elindult a ${PORT}-es porton.`));