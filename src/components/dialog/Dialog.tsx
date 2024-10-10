import React, { useEffect, useState } from "react";
import styles from "./dialog.module.scss";
import { createPortal } from "react-dom";

const Modal = ({
  visible,
  setVisible,
  children,
  blockClosing = false,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
  blockClosing?: boolean;
}) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !blockClosing) {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [visible, blockClosing, setVisible]);

  useEffect(() => {
    if (visible) {
      document.body.style.position = "fixed";
      document.body.style.top = "0px";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [visible]);

  if (!visible) return null;

  return domReady
    ? createPortal(
        <>
          <div
            className={`${styles["modal__main-con"]}`}
            onClick={() => {
              if (blockClosing) return;
              setVisible(false);
            }}
          />
          <div
            className={`${styles["modal__child-con"]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${styles["modal__sub-con"]} nu-flex nu-ai-center`}>
              {children}
            </div>
          </div>
        </>,
        document.getElementById("nymbleup-portal")!
      )
    : null;
};

export default Modal;
