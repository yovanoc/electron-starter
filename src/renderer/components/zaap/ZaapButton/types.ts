export enum ZaapButtonTypes {
  FILLED = "filled",
  LIGHT = "light"
}

export enum ZaapButtonSizes {
  SMALL = "small",
  MEDIUM = "medium"
}

export interface IZaapButtonProps {
  disabled?: boolean;
  type?: ZaapButtonTypes;
  size?: ZaapButtonSizes;
  minWidth?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
