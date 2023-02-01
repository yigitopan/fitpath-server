class HttpError extends Error {
    constructor(message, errorCode){
        super(message) // Add msg prop
        this.code = errorCode // Add code prop
    }
};

module.exports = HttpError;