export const logger = (...data: any[]) =>
  console.log(
    "%c[revolt-lastfm] ::%c",
    "font-weight: bold; color: mediumpurple",
    "font-weight: initial; color: initial",
    ...data,
  );
