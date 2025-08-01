import classNames from "classnames";
import {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";

type BaseProps = {
  label?: string;
  error?: string;
  icon?: ReactNode;
  maxLength?: number;
  isTextarea?: boolean;
  fullWidth?: boolean;
  width?: number;
  type?: "text" | "number";
};

type InputProps = BaseProps &
  (
    | ({ isTextarea?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ isTextarea?: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  );

const Input = ({
  label,
  error,
  icon,
  maxLength,
  isTextarea = false,
  fullWidth = false,
  className,
  value = "",
  width,
  type = "text",
  ...props
}: InputProps) => {
  const valueLength = typeof value === "string" ? value.length : 0;
  const [isFocused, setIsFocused] = useState(false);
  const [showMaxLengthError, setShowMaxLengthError] = useState(false);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if ((props as InputHTMLAttributes<HTMLInputElement>).onFocus)
      (props as InputHTMLAttributes<HTMLInputElement>).onFocus!(e);
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if ((props as InputHTMLAttributes<HTMLInputElement>).onBlur)
      (props as InputHTMLAttributes<HTMLInputElement>).onBlur!(e);
  };
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if ((props as TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus)
      (props as TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus!(e);
  };
  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if ((props as TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur)
      (props as TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur!(e);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      maxLength !== undefined &&
      valueLength >= maxLength &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      setShowMaxLengthError(true);
    }
    if ((props as React.InputHTMLAttributes<HTMLInputElement>).onKeyDown) {
      (props as React.InputHTMLAttributes<HTMLInputElement>).onKeyDown!(e);
    }
  };

  const handleKeyDownTextarea = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      maxLength !== undefined &&
      valueLength >= maxLength &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      setShowMaxLengthError(true);
    }
    if (
      (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onKeyDown
    ) {
      (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onKeyDown!(
        e
      );
    }
  };

  useEffect(() => {
    if (showMaxLengthError) {
      const timer = setTimeout(() => {
        setShowMaxLengthError(false);
      }, 1000); //에러메세지 1초 동안
      return () => clearTimeout(timer);
    }
  }, [showMaxLengthError]);

  //label, input, error 랩
  const containerClass = classNames(
    "flex flex-col gap-2",
    fullWidth && "w-full"
  );

  //input 랩
  const inputWrapperClass = classNames(
    "w-full flex items-center gap-2.5 px-4 py-4 rounded-[8px]",
    "border border-[var(--color-gray-placeholder)]",
    "focus-within:border-[var(--color-primary-400)]",
    className,
    isTextarea && "relative",
    width !== undefined ? `w-[${width}px]` : ""
  );

  //기본 스타일
  const inputBaseClass = classNames(
    "w-full outline-none text-sm placeholder:text-[var(--color-gray-placeholder)]",
    isTextarea ? "min-h-[100px] pr-12 " : "h-4 appearance-none "
  );

  return (
    <div className={containerClass}>
      {label && <label className="text-xs font-medium ml-2">{label}</label>}
      <div className={inputWrapperClass}>
        {isTextarea ? (
          <>
            <textarea
              className={inputBaseClass}
              maxLength={maxLength}
              value={value}
              onKeyDown={handleKeyDownTextarea}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
            {maxLength !== undefined && (
              <span
                className={classNames(
                  "absolute right-4 bottom-4 text-xs",
                  valueLength === 0
                    ? "text-[var(--color-gray-placeholder)]"
                    : "text-[var(--color-primary-400)]"
                )}
              >
                {valueLength}/{maxLength}
              </span>
            )}
          </>
        ) : (
          <>
            <input
              className={inputBaseClass}
              maxLength={type === "number" ? undefined : maxLength}
              value={value?.toString() ?? ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDownInput}
              type={type}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
            {icon && (
              <span
                className={
                  isFocused
                    ? "text-[var(--color-primary-400)] cursor-pointer"
                    : "text-[var(--color-gray-placeholder)] cursor-pointer"
                }
              >
                {icon}
              </span>
            )}
            {maxLength !== undefined && (
              <span
                className={classNames(
                  "text-xs ml-auto",
                  valueLength === 0
                    ? "text-[var(--color-gray-placeholder)]"
                    : "text-[var(--color-primary-400)]"
                )}
              >
                {valueLength}/{maxLength}
              </span>
            )}
          </>
        )}
      </div>
      {showMaxLengthError && (
        <p className="text-xs text-[var(--color-red)] ml-2 ">
          *{error || "최대 글자 수 초과"}
        </p>
      )}
    </div>
  );
};
export default Input;
