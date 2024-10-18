const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// version para almacenamiento de usuarios en array
let users = [];

// obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.json(users);
});

// agregar usuario 
app.post('/api/users', (req, res) => {
    const { name, age, email } = req.body;

    // Validación de datos
    if (!name || !age || !email) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newUser = { name, age, email };
    users.push(newUser);

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
