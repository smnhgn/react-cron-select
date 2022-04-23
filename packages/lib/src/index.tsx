import React, { FC } from "react";

export interface MyComponentProps {
  label: string;
}

export const MyComponent: FC<MyComponentProps> = ({ label }) => {
  return <div>{label}</div>;
};
