import LiteEvent from "common/utils/LiteEvent";

export enum Languages {
  FRENCH = "fr",
  ENGLISH = "en"
}

export default class Langs {
  public static set lang(lang: Languages) {
    this.current = lang;
    this.onChanged.trigger();
  }

  public static get lang() {
    return this.current;
  }

  public static get Changed() {
    return this.onChanged.expose();
  }

  public static go(key: string, ...params: any[]): string {
    const path = key.split(".");
    const lang = this.langs.get(this.current);
    const elang = this.langs.get(Languages.ENGLISH);

    let value;
    let evalue;

    for (const p of path) {
      value = value ? value[p] : lang[p];
      evalue = evalue ? evalue[p] : elang[p];
      if (!value) {
        value = evalue;
      }
    }

    if (params.length === 0) {
      return value;
    } else {
      for (const param of params) {
        value = value.replace("?", param);
      }
      return value;
    }
  }

  private static current = Languages.FRENCH;

  private static onChanged = new LiteEvent<void>();

  private static langs: Map<Languages, any> = new Map([
    [Languages.FRENCH, require("./fr.json")],
    [Languages.ENGLISH, require("./en.json")]
  ]);
}
