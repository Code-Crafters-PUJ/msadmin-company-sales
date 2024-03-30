const pool = require('../db/pool');

const registrarVenta = async (req, res) => {
  const { idNegocio, fechaCompra, fechaExpiracion, tipoPlan, descuento, metodoPago } = req.body;

  try {
    const negocio = await pool.query('SELECT * FROM client WHERE client_id = $1', [idNegocio]);

    if (negocio.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró un Negocio con ese ID asociado' });
    }

    const nuevaVenta = await pool.query(
      'INSERT INTO suscription (initial_date, final_date, suscription_status, plan_id, client_id, payment_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [fechaCompra, fechaExpiracion, 1, tipoPlan, idNegocio, metodoPago]
    );

    res.status(201).json({ message: 'Compra Registrada', venta: nuevaVenta.rows[0] });
  } catch (error) {
    console.error('Error al registrar venta:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerTodasLasVentas = async (req, res) => {
  try {
    const ventas = await pool.query(`
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
    `);
    res.json({ ventas: ventas.rows });
  } catch (error) {
    console.error('Error al obtener todas las ventas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerVentasPorNegocio = async (req, res) => {
  const { idNegocio } = req.params;

  try {
    const ventas = await pool.query(`
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
      WHERE s.client_id = $1
    `, [idNegocio]);

    if (ventas.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ventas para este Negocio' });
    }

    res.json({ ventas: ventas.rows });
  } catch (error) {
    console.error('Error al obtener ventas por negocio:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  registrarVenta,
  obtenerTodasLasVentas,
  obtenerVentasPorNegocio,
};
