export const declimationDreams = (count) => {
  let countToDeclimation = count;

  if (countToDeclimation > 21) {
    countToDeclimation = 21;
  }

  if (countToDeclimation === 0) {
    return "marzeń";
  } else if (countToDeclimation === 1) {
    return "marzenie";
  } else if (countToDeclimation >= 2 && countToDeclimation <= 4) {
    return "marzenia";
  } else {
    return "marzeń";
  }
};
