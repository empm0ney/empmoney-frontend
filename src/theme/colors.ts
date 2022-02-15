import { Colors } from "./types";

export const white = '#FFF';
export const black = '#000';

export const green = {
  500: '#00D110',
};

export const purple = {
  200: '#bd7cfe',
  400: '#ab47bc',
  700: '#7b1fa2',
};

export const yellow = {
  200: '#31b1d8',
  400: '#ab47bc',
  700: '#155aca',
  800: '#153aca',
};

export const red = {
  100: '#C1C1FF',
  200: '#7575FF',
  500: '#9090FF',
};

export const grey = {
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

export const bg = '#000000';

export const teal = {
  200: '#64ffda',
};

export const newNavy = {
  200: '10131e',
};

export const baseColors = {
  failure: "#ED4B9E",
  primary: "#f1aa23",
  primaryBright: "#f1aa23",
  primaryDark: "#f1aa23",
  secondary: "white",
  success: "white",
  warning: "#FFB237",
};

export const brandColors = {
  polygon: "#2891f9",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: "#303444",
  backgroundDisabled: "#E9EAEB",
  contrast: "#191326",
  invertedContrast: "#FFFFFF",
  input: "whitesmoke",
  tertiary: "whitesmoke",
  text: "black",
  textDisabled: "#BDC2C4",
  textSubtle: "black",
  borderColor: "#E9EAEB",
  card: "#FFFFFF",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "white",
  background: "#303444",
  backgroundDisabled: "#3c3742",
  contrast: "#FFFFFF",
  invertedContrast: "#191326",
  input: "darkgray",
  primaryDark: "black",
  tertiary: "#27262c",
  text: "white",
  textDisabled: "#666171",
  textSubtle: "whitesmoke",
  borderColor: "#524B63",
  card: "#27262c",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
