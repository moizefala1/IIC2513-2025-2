require('dotenv').config();
const { sequelize } = require('./models');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();

// Función para cargar swagger.yaml dinámicamente (evita caché)
const getSwaggerDocument = () => {
  return YAML.load(
    fs.readFileSync(path.join(__dirname, '../swagger.yaml'), 'utf8')
  );
};

const router = require('./routes/index.js');

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.FRONT_ORIGIN || 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));



app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', (req, res) => {
  res.send(swaggerUi.generateHTML(getSwaggerDocument(), {
    explorer: true,
    customSiteTitle: 'Dawdle API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
    }
  }));
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hola Mundo en general - API Dawdle funcionando! 🚀');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
