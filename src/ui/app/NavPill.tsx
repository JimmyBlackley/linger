/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  label: string;
  state: "hover" | "active" | "default";
  className: any;
}

export const NavPill = ({
  label = "Link",
  state,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex items-center gap-[var(--size-space-200)] pt-[var(--size-space-200)] pr-[var(--size-space-200)] pb-[var(--size-space-200)] pl-[var(--size-space-200)] rounded-[var(--size-radius-200)] justify-center relative ${state === "active" ? "bg-color-background-brand-tertiary" : (state === "hover") ? "bg-color-background-default-default-hover" : ""} ${className}`}
    >
      <div
        className={`font-single-line-body-base w-fit mt-[-1.00px] tracking-[var(--single-line-body-base-letter-spacing)] text-[length:var(--single-line-body-base-font-size)] [font-style:var(--single-line-body-base-font-style)] relative font-[number:var(--single-line-body-base-font-weight)] whitespace-nowrap leading-[var(--single-line-body-base-line-height)] ${state === "active" ? "text-color-text-brand-on-brand-secondary" : "text-color-text-default-default"}`}
      >
        {label}
      </div>
    </div>
  );
};
