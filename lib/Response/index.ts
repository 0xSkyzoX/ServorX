import http from 'http';
import fs from 'fs';

export default class Response {
    private res: http.ServerResponse;
    constructor(res: http.ServerResponse) {
        this.res = res
    }
    public text(content: string, status: number) {
        this.res.writeHead(status, {'Content-Type': "text/plain"})
        this.res.write(content)
    }
    public json(obj: any, status: number) {
        this.res.writeHead(status, {'Content-Type': 'application/json'})
        this.res.write(JSON.stringify(obj))
    }
    public html(html: string, status: number) {
        this.res.writeHead(status, {'Content-Type': 'text/html'})
        this.res.write(html)
    }
    public sendHtml(path: string, status: number) {
        this.res.writeHead(status, {'Content-Type': 'text/html'})
        const file = fs.readFileSync(path)
        this.res.write(file)
    }
}