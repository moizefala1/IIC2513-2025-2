require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


// Importa rutas aquí
const routes = require('./routes/routes');
//

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
	origin: '*',
	methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
	allowedHeaders: ['Content-Type','Authorization'],
}));

// Usar rutas aquí
app.use('/', routes);
// 

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor escuchando en puerto ${PORT}`);
	});
});
