const Spinner = () => {
    return (
        <>
            <div className="animate-spin inline-block size-16 border-[3px] border-current border-t-bgSecondary text-primary rounded-full dark:text-primary" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    );
}

export default Spinner;