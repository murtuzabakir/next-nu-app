export type ButtonProps = {
  onClick: React.ComponentPropsWithoutRef<"button">["onClick"];
  title: string;
  isDisabled?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  buttonType?: ButtonType;
  gap?: number;
  padding?: string;
  parentWidth?: boolean;
  buttonColor?: string;
};

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
}
