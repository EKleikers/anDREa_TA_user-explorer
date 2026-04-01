import "./Button.css";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "success";
    disabled?: boolean;
    type?: "button" | "submit";
  };
  
  function Button({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
  }: Props) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`btn btn-${variant}`}
      >
        {children}
      </button>
    );
  }
  
  export default Button;