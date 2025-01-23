const express = require('express');
const cors = require('cors');
const path = require('path'); // Para manejar rutas fácilmente
const app = express();
const port = process.env.PORT || 8080;

// *** CONFIGURACIÓN DE CORS (¡¡¡ESTO ES CRUCIAL!!!) ***
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://52.14.85.215', // IP pública del frontend
            'null', // Para peticiones desde archivos locales (file://)
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'POST, GET',
    credentials: true, // Si usas cookies o autenticación con credenciales
};

app.use(cors(corsOptions));

// *** Middleware para procesar JSON ***
app.use(express.json());

// *** Servir archivos estáticos desde SourceReport ***
app.use(express.static(path.join(__dirname, 'SourceReport')));

// *** Mostrar un archivo específico al acceder a la raíz ***
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'SourceReport', 'index.html'));
});

// *** Endpoint para login ***
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'gts' && password === 'gtsargentina') {
        res.status(200).json({ message: 'Login successful', token: 'token_de_ejemplo' });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// *** Manejo de rutas no encontradas ***
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

// *** Manejo de errores del servidor ***
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// *** Iniciar el servidor ***
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Para acceso externo: http://52.14.85.215:${port}`);
});
