import http from 'http';
import { Methods } from '../../@types/';

export default class Request {
    private req: http.IncomingMessage;
    private requestBody: Buffer[] = [];
    private currentMethod: Methods;
    public body: any;
    public path: string
    public headers: http.IncomingHttpHeaders;
   
    private resolvePromise!: () => void;
    constructor(req: http.IncomingMessage, method: Methods) {
        this.req = req;
        this.currentMethod = method
        this.path = req.url
        this.headers = req.headers
        if (method !== "GET") {
            try {
                req.on('data', chunk => {
                    this.requestBody.push(chunk);
                });
                req.on('end', () => {
                    try {
                        this.body = JSON.parse(Buffer.concat(this.requestBody).toString());
                        this.resolvePromise();
                    } catch (err) {
                        console.log(err)
                    }
                });
            } catch (err) {
                console.log(err)
            }
        }
    }
    public async waitForBody(): Promise<void> {
        return new Promise(resolve => {
            this.resolvePromise = resolve;
        });
    }
}
