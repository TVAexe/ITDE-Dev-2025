export default class RequestError extends Error {
    status: number;
    body: any;

    constructor(message: string, status: number, body?: any) {
        super(message);
        this.name = "RequestError";
        this.status = status;
        this.body = body;
    }

    static handle(error: unknown): void {
        if (error instanceof RequestError) {
            console.error(`Error: ${error.message}, Status: ${error.status}, Body:`, error.body);
        } else if (error instanceof Error) {
            console.error(`Unexpected Error: ${error.message}`);
        } else {
            console.error("An unknown error occurred", error);
        }
    }
}
