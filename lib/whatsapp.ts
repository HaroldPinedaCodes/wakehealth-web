import { CartItem, CustomerInfo } from '@/types';
import config from '@/data/config.json';

export function generateWhatsAppMessage(
  items: CartItem[],
  customer: CustomerInfo,
  total: number
): string {
  const itemsList = items
    .map((item) => {
      let line = `• ${item.quantity}x ${item.name} (Talla: ${item.size}, Color: ${item.color}) - $${(item.price * item.quantity).toFixed(2)}`;
      if (item.customNote) {
        line += `\n  📝 Personalización: ${item.customNote}`;
      }
      return line;
    })
    .join('\n');

  const message = `¡Hola! Quiero hacer un pedido:

${itemsList}

*Total: $${total.toFixed(2)}*

*Mis datos:*
👤 Nombre: ${customer.name}
📱 WhatsApp: ${customer.whatsapp}
📧 Email: ${customer.email}
📍 Dirección: ${customer.address}`;

  return message;
}

export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
}
