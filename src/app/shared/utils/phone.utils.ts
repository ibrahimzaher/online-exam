export function formatPhoneNumber(rawPhone: any): string {
  if (!rawPhone || !rawPhone.e164Number) return '';

  let cleanPhone = rawPhone.e164Number.replace(/\D/g, '');

  if (cleanPhone.startsWith('20')) {
    cleanPhone = '0' + cleanPhone.substring(2);
  }

  if (cleanPhone.length === 10 && cleanPhone.startsWith('1')) {
    cleanPhone = '0' + cleanPhone;
  }

  return cleanPhone;
}
