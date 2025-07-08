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
  ...props
}: InputProps) => {
  const valueLength = typeof value === "string" ? value.length : 0;
  const [isFocused, setIsFocused] = useState(false);
  const [showMaxLengthError, setShowMaxLengthError] = useState(false);

  useEffect(() => {
    if (showMaxLengthError) {
      const timer = setTimeout(() => {
        setShowMaxLengthError(false);
      }, 1000); //에러메세지 1초 동안
      return () => clearTimeout(timer);
    }
  }, [showMaxLengthError]);

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (
      maxLength !== undefined &&
      valueLength >= maxLength &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      setShowMaxLengthError(true);
    }
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

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
    isTextarea && "relative"
  );

  //기본 스타일
  const inputBaseClass = classNames(
    "flex-1 outline-none text-sm placeholder:text-[var(--color-gray-placeholder)]",
    isTextarea ? "min-h-[100px] pr-12 " : "h-4"
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
              onKeyDown={keyDownHandler}
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
              maxLength={maxLength}
              value={value}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
              onFocus={(e) => {
                setIsFocused(true);
                if (props.onFocus) props.onFocus(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                if (props.onBlur) props.onBlur(e);
              }}
              onKeyDown={keyDownHandler}
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
