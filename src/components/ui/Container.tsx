import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl xl:max-w-5xl",
    default: "max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]",
    wide: "max-w-7xl 2xl:max-w-[1560px]",
    full: "max-w-[1680px]",
  }[size];

  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
