export enum Locale {
  de = 'de',
  en = 'en',
}

export const defaultLocale: Locale = Locale.de;

type Translations<T = any> = { [K in Locale]: T };

export const translations: Translations<{ translation: any }> = {
  de: {
    translation: {
      '404': 'Die Seite, die Sie suchen, könnte sich in einem anderen Schloss befinden.',
      cancel: 'Abbrechen',
      completed: 'Abgeschlossen',
      create: 'Neu',
      dateFormat: 'dd.MM.yyyy',
      dateOfBirth: 'Geburtsdatum',
      dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
      de: 'Deutsch',
      delete: 'Löschen',
      description: 'Beschreibung',
      dialog_delete_text: 'Eintrag löschen?',
      dueDate: 'Fälligkeitsdatum',
      edit: 'Bearbeiten',
      email: 'E-Mail',
      en: 'Englisch',
      error_date: 'Kein gültiges Datum.',
      error_empty: 'Darf nicht leer sein.',
      error_integer: 'Keine ganze Zahl.',
      error_mail: 'Keine gültige Email-Adresse.',
      error_number: 'Keine Zahl.',
      id: 'ID',
      language: 'Sprache',
      message_create: 'neu erstellt.',
      message_delete: 'gelöscht.',
      message_read: 'gelesen.',
      message_update: 'aktualisiert.',
      name: 'Name',
      owner: 'Ersteller',
      phone: 'Telefon',
      reading: 'Laden',
      reload: 'Neu Laden',
      save: 'Speichern',
      size: 'Größe',
      submitting: 'Schreiben',
      todo: 'Todo',
      tooltip_action_inactive: 'Andere Aktionen abschließen.',
      tooltip_invalid: 'Einige Felder enthalten ungültige Daten.',
      tooltip_no_changes: 'Keine Änderungen vorhanden.',
      tooltip_reading: 'Es werden gerade Daten gelesen.',
      tooltip_submitting: 'Es wird gerade gespeichert.',
      user: 'Nutzer',
      was: 'wurde',
      wasNot: 'wurde nicht erfolgreich',
      weight: 'Gewicht',
    },
  },
  en: {
    translation: {
      '404': 'The page you are looking for might be in another castle.',
      cancel: 'Cancel',
      completed: 'Completed',
      create: 'Create',
      dateFormat: 'MM/dd/yyyy',
      dateOfBirth: 'Date of birth',
      dateTimeFormat: 'MM/dd/yyyy hh:mm:ss a',
      de: 'German',
      delete: 'Delete',
      description: 'Description',
      dialog_delete_text: 'Delete entry?',
      dueDate: 'Due date',
      edit: 'Edit',
      email: 'E-Mail',
      en: 'English',
      error_date: 'No valid date.',
      error_empty: 'Must not be empty.',
      error_integer: 'No whole number.',
      error_mail: 'No valid email address.',
      error_number: 'No number.',
      id: 'ID',
      language: 'Language',
      message_create: 'created.',
      message_delete: 'deleted.',
      message_read: 'read.',
      message_update: 'updated.',
      name: 'Name',
      owner: 'Owner',
      phone: 'Phone',
      reading: 'Reading',
      reload: 'Reload',
      save: 'Save',
      size: 'Size',
      submitting: 'Submitting',
      todo: 'Todo',
      tooltip_action_inactive: 'Finish other actions.',
      tooltip_invalid: 'Some fields contain invalid data.',
      tooltip_no_changes: 'No changes present.',
      tooltip_reading: 'Reading data.',
      tooltip_submitting: 'Submitting data.',
      user: 'User',
      was: 'was',
      wasNot: 'could not be',
      weight: 'Weight',
    },
  },
};

export const t = (key: string, lang: Locale = defaultLocale, placeholders: any = {}): string => {
  let trans: string = (translations[lang] && translations[lang].translation[key]) || key;
  for (const phKey in placeholders) {
    if (placeholders.hasOwnProperty(phKey)) {
      trans = trans.replace(new RegExp(`{${phKey}}`, 'g'), placeholders[phKey]);
    }
  }
  return trans;
};

export const createMessage = (
  action: 'create' | 'read' | 'update' | 'delete',
  element: string,
  success: boolean
): string => {
  const elementString: string = t(element);
  const successString: string = success ? t('was') : t('wasNot');
  const actionString: string = t(`message_${action}`);
  return `${elementString} ${successString} ${actionString}`;
};

const numberStringRegexp: Translations<RegExp> = {
  de: /^[+-]?\d+(,\d+)?$/,
  en: /^[+-]?\d+(\.\d+)?$/,
};

const numberStringConvertFct: Translations<(value: string) => string> = {
  de: (value: string): string => value.replace(/,/g, '.'),
  en: (value: string): string => value,
};

export const numberStringValidate = (value: string, lang: Locale): boolean => numberStringRegexp[lang].test(value);

export const numberStringConvert = (value: string, lang: Locale): string => numberStringConvertFct[lang](value);
