const CODIGO_PROMO = "PROMO10";
const DESCUENTO_PROMO = 0.1;

/**
 * @typedef {{ precio: number, cantidad: number }} Item
 */

/**
 * Calcula el subtotal del carrito.
 * @param {Item[]} items
 * @returns {number}
 * @throws {TypeError} Si `items` no es un arreglo.
 * @throws {RangeError} Si alguna cantidad no es un entero mayor o igual a 1.
 */
export const calcularSubtotal = (items) => {
  if (!Array.isArray(items)) {
    throw new TypeError("items debe ser un arreglo");
  }

  return items.reduce((subtotal, item) => {
    if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
      throw new RangeError("La cantidad debe ser un entero mayor o igual a 1");
    }

    return subtotal + item.precio * item.cantidad;
  }, 0);
};

/**
 * Aplica el descuento correspondiente al código promocional.
 * @param {number} subtotal
 * @param {string | undefined} codigo
 * @returns {number}
 */
export const aplicarCodigo = (subtotal, codigo) => {
  if (codigo === CODIGO_PROMO) {
    return subtotal - subtotal * DESCUENTO_PROMO;
  }

  return subtotal;
};

/**
 * Redondea una cantidad a dos decimales.
 * @param {number} cantidad
 * @returns {number}
 */
export const redondear2 = (cantidad) => Math.round(cantidad * 100) / 100;

/**
 * Calcula el total del carrito, incluyendo el descuento aplicable.
 * @param {Item[]} items
 * @param {string | undefined} codigo
 * @returns {number}
 */
export const calcularTotal = (items, codigo) =>
  redondear2(aplicarCodigo(calcularSubtotal(items), codigo));

export const procesar = calcularTotal;
