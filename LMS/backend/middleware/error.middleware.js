const errorMiddleware=(err,req,res,next)=>{
    errorMiddleware.statusCode=err.statusCode||500;
    err.message=err.message||"something went wrong";
    return res.status(statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack
    })
}
export default errorMiddleware;