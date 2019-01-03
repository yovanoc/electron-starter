import Langs, { Languages } from "common/langs";
import { useEffect, useState } from "react";

export default function useLang() {
  const [lang, setLang] = useState<Languages>(Languages.ENGLISH);

  useEffect(() => {
    const langChanged = () => setLang(Langs.lang);
    langChanged();
    Langs.Changed.on(langChanged);
    return () => {
      Langs.Changed.off(langChanged);
    };
  }, []);

  return lang;
}
