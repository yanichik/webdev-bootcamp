class MyError extends Error {
	constructor(message, status){
		super();
		this.message = message;
		this.status = status;
	}
}

throw new MyError("new error", 401);