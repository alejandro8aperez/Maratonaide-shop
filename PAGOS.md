# Configuración de pagos y entrega

La tienda está publicada como un sitio estático. El navegador puede enviar al
cliente al checkout seguro de Wompi, pero no debe decidir por sí mismo si un
pago fue aprobado. El libro físico se entrega solamente después de que Wompi
confirme la transacción.

## Datos del producto

- **Producto:** MARATONaide — Libro físico impreso
- **Precio:** $45.000 COP
- **Formato:** Libro físico (no se vende PDF ni EPUB)
- **Entrega:** En la feria (ExpoRunners, entrega directa) o envío dentro de Medellín por $12.000 tras confirmación de pago
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
5. Configura en Wompi una URL de redirección hacia el sitio. Revisa en el panel
   de Wompi los pagos aprobados para poder despachar el libro físico con el
   importe y SKU esperados.

## Despacho del libro físico

La entrega es manual y física (no hay descarga digital):

1. Verifica en el panel de Wompi que la transacción está `APPROVED`, corresponde
   al monto ($45.000 COP) y SKU de MARATONaide.
2. Despacha el libro: entrega directa en la feria (ExpoRunners) o envío dentro
   de Medellín por $12.000, usando la solicitud recibida en Formspree como
   referencia del cliente.
