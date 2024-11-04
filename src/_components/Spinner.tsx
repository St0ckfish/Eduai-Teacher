const Spinner = () => {
  return (
    <>
      <div
        className="inline-block size-16 animate-spin rounded-full border-[3px] border-current border-t-bgSecondary text-primary dark:text-primary"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Spinner;
