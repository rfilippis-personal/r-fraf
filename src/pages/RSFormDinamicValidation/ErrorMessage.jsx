import React from "react";

export const ErrorMessage = ({ id, children }) => (
  <div
    id={`${id}-error-message`}
    role="alert"
    aria-relevant="all"
    className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start">
    <span className="rs-form-error-message rs-form-error-message-show">
      <span className="rs-form-error-message-arrow"></span>
      <span className="rs-form-error-message-inner">{children}</span>
    </span>
  </div>
);
