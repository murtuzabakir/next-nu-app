import { Dispatch, SetStateAction } from "react";

export type TooltipModalProps = {
  visible: boolean;
  forceBottom?: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  resetDefaultStyles?: boolean;
  children?: React.ReactNode;
  className?: unknown;
  closeOnClickOutside?: boolean;
  gapOffset?: number;
  horizontalOffset?: number;
  verticalOffset?: number;
  forceRight?: boolean;
  forceTop?: boolean;
  isRtl?: boolean;
  showArrow?: boolean;
  parentBoxData?: DOMRect;
  shiftAxis?: {
    x: number;
    y: number;
  };
  stopParentLookup?: boolean;
};
