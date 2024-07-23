import React from "react";

function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`rounded-[8px] bg-[#13064b] py-[8px] px-[12px] font-medium text-white shadow-[rgba(159,_158,_158,_0.938)_0px_8px_15px] hover:bg-[#2e7fef]`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default IconBtn;
