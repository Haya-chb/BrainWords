const LOCALES = {
  "Français": "fr-FR",
  "English": "en-GB",
};

export const ChangeLanguage = ({ locale, onLocaleChange }) => {
  return (
    <select value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
      {Object.entries(LOCALES).map(([label, value]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};