function ButtonPrimary({
  children,
  type = "button",
  onClick = () => {},
  isLoading,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="hover:bg-white hover:text-secondary rounded-md py-2 mt-4 font-semibold bg-primary text-white transition-all duration-200 hover:scale-105 active:scale-95"
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
}

export default ButtonPrimary;