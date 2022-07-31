import React from "react";

const Modal = ({ children, className, show, size, setShow, ...props }) => {
  let classTxt = "modal";

  if (show) classTxt += " modal-open";
  if (size) classTxt += " modal-" + size;
  if (className) classTxt += " " + className;

  return (
    <>
      <div className={classTxt} {...props}>
        <div className="modal-mask" onClick={() => setShow(false)} />
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
};

const Content = ({ className, children, ...props }) => {
  let classTxt = "modal-content";
  if (className) classTxt += " " + className;

  return (
    <div className={classTxt} {...props}>
      {children}
    </div>
  );
};

const Action = ({ className, children, ...props }) => {
  let classTxt = "modal-action";
  if (className) classTxt += " " + className;

  return (
    <div className={classTxt} {...props}>
      {children}
    </div>
  );
};

export default Object.assign(Modal, { Content, Action });
