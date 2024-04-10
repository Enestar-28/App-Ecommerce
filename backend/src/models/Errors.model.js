

class ErrorWithStatus {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}


class EntityError extends ErrorWithStatus {
    
    constructor({ message ="Lỗi nhập từ bàn phím", errors }) {
        super(422, message); 
        this.errors = errors;

        
    }
}

module.exports = {
    ErrorWithStatus,
    EntityError
}