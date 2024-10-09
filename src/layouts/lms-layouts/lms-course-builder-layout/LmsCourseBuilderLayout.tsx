"use client";
import Button from "@/src/components/button/Button";
import { ButtonType } from "@/src/components/button/types";
import Header from "@/src/components/header/Header";
import IconButton from "@/src/components/icon-button/IconButton";
import { IconSize } from "@/src/constants/iconsize.constant";
import { ArrowLeft, Pencil, Share, X } from "@phosphor-icons/react";
import React from "react";

const LmsCourseBuilderLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Header
        classnames="nu-ai-center nu-flex"
        paddingTop={12}
        paddingBottom={12}
        leftComponent={
          <div className="nu-flex nu-ai-center nu-gap-3 ">
            <IconButton
              icon={<ArrowLeft size={IconSize.L} />}
              onClick={() => {}}
            />
            <p>Course name</p>
            <IconButton
              icon={<Pencil size={IconSize.M} />}
              onClick={() => {}}
            />
          </div>
        }
        rightComponent={
          <div className="nu-flex nu-ai-center nu-gap-5">
            <Button
              buttonType={ButtonType.primary}
              prefixIcon={<Share size={IconSize.M} />}
              onClick={() => {}}
              title="Publish"
            />
            <IconButton icon={<X size={IconSize.XL} />} onClick={() => {}} />
          </div>
        }
      />
      <p>tabs</p>
      {children}
    </div>
  );
};

export default LmsCourseBuilderLayout;
