export const colorSelector = (position: number) => {

  const colors: Array<string> = ["", "red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
  const color = colors[position];

  return color;
};
