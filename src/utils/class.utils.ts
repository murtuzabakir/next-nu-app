const classNameFormatter = (value: unknown): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (Array.isArray(value)) {
    return value.reduce((acc, red) => {
      return `${acc} ${classNameFormatter(red)}`;
    }, "");
  }
  return Object.entries(value as object).reduce((acc, [key, val]) => {
    if (val) return `${acc} ${key}`;
    return acc;
  }, "");
};

const classNames = (...args: unknown[]): string => {
  return args.reduce(
    (acc, red) => `${acc} ${classNameFormatter(red)}`,
    ""
  ) as string;
};

export { classNames as cn };
