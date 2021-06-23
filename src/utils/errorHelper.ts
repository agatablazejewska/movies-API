export const convertToMeaningfulErrorsArray = (errors) => {
    const meaningfulErrors = errors.reduce((prev, current) => {
        return prev.concat(Object.values(current.constraints));
    }, []);
    return meaningfulErrors;
}