const express = require('express');
const app = express();
const ventaRoutes = require('./routes/ventasRoutes');


app.use(express.json());

app.use('/venta', ventaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
