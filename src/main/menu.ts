import { app, MenuItemConstructorOptions } from "electron";

export const template: MenuItemConstructorOptions[] = [
  {
    label: app.getVersion(),
    submenu: [
      {
        click: () => {
          //
        },
        label: "Check updates"
      }
    ]
  }
];

if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  });
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        accelerator: "Command+Q",
        click() {
          app.quit();
        },
        label: "Quit"
      }
    ]
  });
}
