export type SearchBoxProps = {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placeholder: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "num";
  width?: number;
  autoWidth?: boolean;
};
