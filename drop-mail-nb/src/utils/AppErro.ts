export class AppError {
    errors: ErrorEntry[];

    constructor(errors: ErrorEntry[]) {
        this.errors = errors;
    }
    getErrorMessage(): string | undefined {
        if (this.errors.length > 0) {
          return this.errors[0].message;
        }
        return undefined;
      }
}
class ErrorEntry {
    path: string[];
    message: string;
    extensions: { code: string };
  
    constructor(path: string[], message: string, code: string) {
      this.path = path;
      this.message = message;
      this.extensions = { code };
    }
  }