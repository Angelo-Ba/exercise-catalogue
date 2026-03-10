export const ERROR_MAPPING: Record<string, string> = {
  GENERIC_SERVER_ERROR: 'Errore del server generico',
  NEGATIVE_PRODUCT_PRICE: 'Il prezzo del prodotto non può essere negativo.',
  PRODUCT_NAME_REQUIRED: 'Il nome del prodotto è obbligatorio.',
  INVALID_PRODUCT_NAME: 'Questo nome del prodotto è invalido',
  CATEGORY_NOT_FOUND: 'La categoria selezionata non esiste.',
  CATEGORY_NAME_EMPTY: 'Il nome categoria non è valorizzato correttamente.',
  'NAME SHOULD NOT BE EMPTY': 'Il nome non può essere vuoto.', // Per gli errori standard di class-validator
  PRODUCT_NOT_FOUND: 'Il prodotto che stai cercando di modificare non esiste.',
};

export const ERROR_MAPPING_FE: Record<string, string> = {
  REQUIRED: 'Questo campo è obbligatorio',
  MINLENGTH: 'Inserire almeno 3 caratteri',
  MAXLENGTH: 'Massimo 50 caratteri consentiti',
  MIN: 'Il valore deve essere maggiore o uguale a 0',
};

export function getFormControlError(errors: any): string {
  if (!errors) return '';
  const firstKey = Object.keys(errors)[0].toUpperCase();
  return ERROR_MAPPING_FE[firstKey] || 'Campo non valido';
}
