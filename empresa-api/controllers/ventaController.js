const Venta = require('../models/venta');
const conexion = require('../models/conexion');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

exports.crearVenta = (req, res) => {
  const { cliente_id, total, detalles } = req.body;

  if (!cliente_id || !detalles || detalles.length === 0) {
    return res.status(400).json({ mensaje: 'Datos de venta incompletos' });
  }

  Venta.crearVenta({ cliente_id, total }, detalles, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id_venta: result.ventaId });
  });
};

exports.generarNotaPdf = (req, res) => {
  const ventaId = req.params.id;

  const sqlCab = `
    SELECT v.id_venta, v.fecha, v.total, c.nombre AS nombre_cliente
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id_cliente
    WHERE v.id_venta = ?
  `;
  const sqlDet = `
    SELECT p.nombre AS producto, dv.cantidad, dv.precio_unitario,
           dv.subtotal
    FROM detalle_ventas dv
    JOIN productos p ON dv.producto_id = p.id_producto
    WHERE dv.venta_id = ?
  `;

  conexion.query(sqlCab, [ventaId], (err, cabecera) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (cabecera.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });

    conexion.query(sqlDet, [ventaId], (err2, detalles) => {
      if (err2) return res.status(500).json({ error: 'Error interno del servidor' });

      // Generar PDF en memoria
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res
          .status(200)
          .set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=nota_${ventaId}.pdf`,
            'Content-Length': pdfData.length
          })
          .send(pdfData);
      });

      // Escribir contenido
      const venta = cabecera[0];
      doc.fontSize(20).text('NOTA DE VENTA', { align: 'center' }).moveDown();
      doc.fontSize(12)
         .text(`Venta #${venta.id_venta}`)
         .text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`)
         .text(`Cliente: ${venta.nombre_cliente}`)
         .moveDown();

      doc.fontSize(14).text('DETALLE DE PRODUCTOS', { underline: true }).moveDown();
      detalles.forEach(d => {
        doc.fontSize(10)
           .text(d.producto,    50)
           .text(d.cantidad,   250)
           .text(`$${d.precio_unitario.toFixed(2)}`, 350)
           .text(`$${d.subtotal.toFixed(2)}`,         450)
           .moveDown();
      });

      doc.moveDown().fontSize(14).text(`TOTAL: $${venta.total.toFixed(2)}`, { align: 'right' });
      doc.end();
    });
  });
};

exports.generarNotaExcel = (req, res) => {
  const ventaId = req.params.id;

  const sqlCab = `
    SELECT v.id_venta, v.fecha, v.total, c.nombre AS nombre_cliente
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id_cliente
    WHERE v.id_venta = ?
  `;
  const sqlDet = `
    SELECT p.nombre AS producto, dv.cantidad, dv.precio_unitario,
           dv.subtotal
    FROM detalle_ventas dv
    JOIN productos p ON dv.producto_id = p.id_producto
    WHERE dv.venta_id = ?
  `;

  conexion.query(sqlCab, [ventaId], async (err, cabecera) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (cabecera.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });

    conexion.query(sqlDet, [ventaId], async (err2, detalles) => {
      if (err2) return res.status(500).json({ error: 'Error interno del servidor' });

      const venta = cabecera[0];
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Nota de Venta');

      ws.addRow(['NOTA DE VENTA']).font = { size: 16, bold: true };
      ws.addRow([]);
      ws.addRow(['Venta #', venta.id_venta]);
      ws.addRow(['Fecha', new Date(venta.fecha).toLocaleString()]);
      ws.addRow(['Cliente', venta.nombre_cliente]);
      ws.addRow([]);
      ws.addRow(['Producto', 'Cantidad', 'Precio Unit.', 'Subtotal']).font = { bold: true };

      detalles.forEach(d => {
        ws.addRow([d.producto, d.cantidad, d.precio_unitario, d.subtotal]);
      });

      ws.addRow([]);
      ws.addRow(['', '', 'TOTAL', venta.total]).font = { bold: true };

      // Generar buffer y enviar
      const buffer = await wb.xlsx.writeBuffer();
      res
        .status(200)
        .set({
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename=nota_${ventaId}.xlsx`,
          'Content-Length': buffer.length
        })
        .send(buffer);
    });
  });
};
