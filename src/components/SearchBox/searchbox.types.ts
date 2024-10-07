export type SearchBoxProps = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "num";
  width?: number;
  autoWidth?: boolean;
  classnames?: string;
};
