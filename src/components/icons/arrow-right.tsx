import React from "react";

type Props = {
  color: string;
};

export function ArrowRightIcon({ color }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" />
      <path
        d="M10.8535 7.61415L5.85352 2.15976C5.65829 1.94674 5.34169 1.94674 5.14642 2.1598C4.95119 2.37281 4.95119 2.71816 5.14645 2.93118L9.7929 7.9999L5.14642 13.0689C4.95119 13.2819 4.95119 13.6272 5.14645 13.8403C5.24405 13.9468 5.37202 14 5.49999 14C5.62796 14 5.75592 13.9468 5.85356 13.8402L10.8535 8.38553C10.9473 8.28324 11 8.14452 11 7.99986C11 7.85521 10.9473 7.71644 10.8535 7.61415Z"
        fill={color}
      />
    </svg>
  );
}

