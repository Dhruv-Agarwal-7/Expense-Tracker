export const catchAsyncError = (theFunction) => {
    return (req, res, next) => { 
        Promise.resolve(theFunction(req,res,next)).catch(next);
    }
}