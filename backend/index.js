const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// version para almacenamiento de usuarios en array
let users = [];

//mensaje por defecto al acceder a url
app.get('/', (req, res) => {
    res.send("Bienvenido a la mejor API de usuarios.");
});


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

    //nombre
    const validNameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!validNameRegex.test(name)) {
            return res.status(400).json({ error: "Ingrese un nombre válido" });
        }

     // edad número positivo
     if (isNaN(age) || age <= 0) {
        return res.status(400).json({ error: "La edad debe ser un número positivo" });
    }
    //edad razonable
    if (age >= 150){
        return res.status(400).json({ error: "La edad debe ser realista" });
    }

    // email formato básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "El correo electrónico no es válido" });
    }


    const newUser = { name, age, email };
    users.push(newUser);

    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
