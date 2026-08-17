# Configuración de pagos y entrega

La tienda está publicada como un sitio estático. El navegador puede enviar al
cliente al checkout seguro de Wompi, pero no debe decidir por sí mismo si un
pago fue aprobado. La entrega de un archivo digital debe ocurrir solamente
después de que Wompi confirme la transacción.

## Datos del producto

- **Producto:** MARATONaide — PDF + EPUB
- **Precio:** $45.000 COP
- **Entrega:** Dentro de 24 horas tras confirmación de pago (manual o automática)
- **Contacto:** maratonaide@gmail.com

## Antes de publicar

1. En Wompi crea un **link de pago fijo en COP** para cada edición (ES, EN y
   FR). Wompi Colombia procesa COP, por lo que no se debe anunciar USD si el
   checkout cobra pesos colombianos.
2. Configura cada link con el nombre de la edición, precio de $45.000 COP, sin
   dirección de envío y con un SKU distinto (`maratonaide-es`,
   `maratonaide-en`, `maratonaide-fr`). Usa un link reutilizable.
3. Reemplaza las URLs de `PAYMENT_LINKS` en `js/checkout.js`:
   - `es`: ya configurado (VPOS_axGQjW)
   - `en`: PENDIENTE — crear link en Wompi
   - `fr`: PENDIENTE — crear link en Wompi
4. Confirma en Formspree que el formulario `meeyznvp` pertenece al correo del
   vendedor y que permite solicitudes desde el dominio publicado. Los mensajes
   recibidos con estado `Pendiente de pago en Wompi` son solicitudes: **no son
   comprobantes de pago**.
5. Configura en Wompi una URL de redirección hacia el sitio y un webhook HTTPS
   que reciba eventos de transacción. El webhook debe verificar la firma del
   evento y entregar el PDF/EPUB solo con estado `APPROVED`, importe y SKU
   esperados.

## Entrega automática

GitHub Pages no puede recibir webhooks ni proteger secretos. Para automatizar
la entrega se necesita un endpoint de servidor (por ejemplo, una función
serverless) con estas responsabilidades:

1. Validar la firma del webhook de Wompi.
2. Comprobar que la transacción está `APPROVED`, corresponde al monto ($45.000
   COP) y SKU de MARATONaide y no se ha procesado antes.
3. Guardar la orden y enviar al correo pagador los enlaces privados del PDF y
   EPUB de la edición comprada.
4. Marcar la transacción como entregada para que un reintento del webhook no
   genere otro envío.

Hasta que exista ese endpoint, concilia los pagos aprobados en el panel de
Wompi con la solicitud recibida en Formspree y envía manualmente los archivos.
