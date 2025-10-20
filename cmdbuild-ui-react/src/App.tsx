import { useEffect, useState } from "react";
import {
  checkSessionValidity,
  loadLocale,
  loadPublicConfs,
  loadSystemConfs,
  loadUserPreferences,
} from "./utils/helper/SessionHelper";

function App() {
  const [initialized, setInitialized] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    async function initApp() {
      const session = await checkSessionValidity();

      if (session.valid) {
        await Promise.all([loadSystemConfs(), loadUserPreferences()]);
        const locale = await loadLocale(session.language);
        setLanguage(session.language);
        console.log("System locale loaded:", locale);
      } else {
        await loadPublicConfs();
        const locale = await loadLocale("en");
        console.log("Public locale loaded:", locale);
      }

      setInitialized(true);
    }

    initApp();

    window.onbeforeunload = (e) => {
      // mimic FormHelper.isFormSaving() guard
      const isSaving = false;
      if (isSaving) {
        e.preventDefault();
        e.returnValue = "The application is still saving data.";
      }
    };
  }, []);

  if (!initialized) return <div>Loading...</div>;

  return <div>Main View (language: {language})</div>;
}

export default App;
