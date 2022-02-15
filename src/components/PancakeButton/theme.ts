import { ButtonTheme, variants } from "./types";
import { yellow } from "../../theme/colors";

const { PRIMARY, SECONDARY, TERTIARY, TEXT, DANGER, SUBTLE, SUCCESS } = variants;

export const light: ButtonTheme = {
  [PRIMARY]: {
    background: yellow[700],
    backgroundActive: yellow[800],
    backgroundHover: yellow[800],
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "inset 0px -1px 0px rgba(14, 14, 44, 0.4)",
    boxShadowActive: "inset 0px -1px 0px rgba(14, 14, 44, 0.4)",
    color: "#FFFFFF",
  },
  [SECONDARY]: {
    background: "transparent",
    backgroundActive: "transparent",
    backgroundHover: "transparent",
    border: `2px solid ${yellow[700]}`,
    borderColorHover: yellow[800],
    boxShadow: "none",
    boxShadowActive: "none",
    color: yellow[700],
  },
  [TERTIARY]: {
    background: yellow[700],
    backgroundActive: yellow[700],
    backgroundHover: yellow[700],
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: yellow[700],
  },
  [TEXT]: {
    background: "transparent",
    backgroundActive: "transparent",
    backgroundHover: yellow[700],
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: yellow[700],
  },
  [DANGER]: {
    background: yellow[700],
    backgroundActive: "#D43285", // darkten 10%
    backgroundHover: "#FF65B8", // lighten 10%
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
  [SUBTLE]: {
    background: yellow[700],
    backgroundActive: `${yellow[700]}D9`, // 70% opacity
    backgroundHover: `${yellow[700]}B3`, // 85% opacity
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
  [SUCCESS]: {
    background: yellow[700],
    backgroundActive: `${yellow[700]}D9`, // 70% opacity
    backgroundHover: `${yellow[700]}B3`, // 85% opacity
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
};

export const dark: ButtonTheme = {
  [PRIMARY]: {
    ...light.primary,
  },
  [SECONDARY]: {
    ...light.secondary,
  },
  [TERTIARY]: {
    ...light.tertiary,
    background: yellow[700],
    backgroundActive: yellow[700],
    backgroundHover: yellow[700],
    color: yellow[700],
  },
  [TEXT]: {
    ...light.text,
    backgroundHover: yellow[700],
  },
  [DANGER]: {
    ...light.danger,
  },
  [SUBTLE]: {
    ...light.subtle,
  },
  [SUCCESS]: {
    ...light.success,
  },
};
