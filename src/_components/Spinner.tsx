interface SpinnerProps {
  size?: number; // Optional prop for size
}

const Spinner: React.FC<SpinnerProps> = ({ size = 75 }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-[3px] border-current border-t-bgSecondary text-primary`}
      role="status"
      aria-label="loading"
      style={{
        width: size,
        height: size,
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
