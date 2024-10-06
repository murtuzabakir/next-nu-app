/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "../styles/tooltip-modal.module.scss";
import { cn } from "@/src/utils/class.utils";

type TooltipModalProps = {
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

const TooltipModal = ({
  visible = false,
  setVisible,
  resetDefaultStyles = false,
  children,
  className,
  closeOnClickOutside = true,
  gapOffset = 20,
  horizontalOffset = 20,
  verticalOffset = 20,
  forceRight = false,
  forceBottom = false,
  forceTop = false,
  isRtl = false,
  showArrow = false,
  parentBoxData,
  shiftAxis = {
    x: 0,
    y: 0,
  },
  stopParentLookup = false,
}: TooltipModalProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    const parent = stopParentLookup
      ? boxRef.current
      : boxRef.current?.parentElement;
    if (parent && !parent.contains(e.target as Node)) {
      if (visible) setVisible(false);
    }
  };

  useEffect(() => {
    if (!closeOnClickOutside) return;
    window.addEventListener("click", handleOutsideClick, true);
    return () => window.removeEventListener("click", handleOutsideClick, true);
  }, [boxRef.current, visible]);

  const updateHorizontalPosition = (val: DOMRect) => {
    if (
      val.x + val.width + horizontalOffset > window.innerWidth ||
      forceRight
    ) {
      if (isRtl) {
        boxRef.current?.style.setProperty("left", `${shiftAxis.x + 0}px`);
      } else {
        boxRef.current?.style.setProperty("right", `${shiftAxis.x + 0}px`);
      }
    } else {
      boxRef.current?.style.removeProperty("right");
      boxRef.current?.style.setProperty("left", `${shiftAxis.x + 0}px`);
    }
  };

  const updateVerticalPosition = (val: DOMRect) => {
    const calcOffset: number =
      (parentBoxData || val).y + (parentBoxData?.height || 0) + verticalOffset;

    if (
      (!forceBottom && calcOffset + val.height > window.innerHeight) ||
      forceTop
    ) {
      boxRef.current?.style.setProperty(
        "bottom",
        `calc(100% + ${gapOffset + shiftAxis.y}px)`
      );
    } else {
      boxRef.current?.style.removeProperty("bottom");
      boxRef.current?.style.setProperty(
        "top",
        `calc(100% + ${gapOffset + shiftAxis.y}px)`
      );
    }
  };

  useEffect(() => {
    if (boxRef.current) {
      const boxData = boxRef.current.getBoundingClientRect();
      updateHorizontalPosition(boxData);
      updateVerticalPosition(boxData);
    }
  }, [boxRef.current, visible]);

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className={cn(
        styles["tooltip-modal"],
        {
          [styles["tooltip-modal__styles"]]: !resetDefaultStyles,
        },
        className
      )}
      data-id="tooltip-dropdown"
    >
      {showArrow ? <div>{arrowSvg}</div> : null}
      {children}
    </div>
  );
};

export default TooltipModal;

const arrowSvg = (
  <div className={styles["arrow"]}>
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.212605 2.44944C-0.361711 1.4505 0.358004 0.203912 1.51027 0.201812L13.8511 0.179315C15.0071 0.177207 15.7309 1.42826 15.1529 2.42931L8.963 13.1506C8.38504 14.1516 6.93969 14.1503 6.36356 13.1482L0.212605 2.44944Z"
        fill="var(--black-c)"
      />
      <path
        d="M0.212605 3.44944L6.36356 13.1482"
        stroke="var(--stroke-border)"
        strokeWidth="1"
      />
      <path
        d="M14.8511 3.179315L8.963 13.1506"
        stroke="var(--stroke-border)"
        strokeWidth="1"
      />
      <path
        d="M6.36356 13.1482 A 7.5 7.5 0 0 0 8.963 13.1506"
        stroke="var(--stroke-border)"
        strokeWidth="1"
      />
    </svg>
  </div>
);
