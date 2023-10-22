export class AppError extends Error {
	constructor( message: string) {
		super(message);
	}
}
export class ErrorEntry {
	path: string[];
	message: string;
	extensions: { code: string };

	constructor(path: string[], message: string, code: string) {
		this.path = path;
		this.message = message;
		this.extensions = { code };
	}
}