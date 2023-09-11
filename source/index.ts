import http from 'node:http'
import { SXR } from '../@types/interfaces/route';
import { Methods } from '../@types';
import Request from '../lib/Request';
import Response from '../lib/Response';
import ConvertPath from '../utils/path';

/**
 * Exact Paths Routing
 */

export default class ServerX {
    public port: number;
    private routes: SXR[] = [];
    private http = http.createServer(async (req, res) => {
        const path = req.url;
        const route = this.routes.find(route => ConvertPath(route.path) === ConvertPath(path) && route.method === req.method);
        if (route) {
            console.log(route.path.split(";"))
            const _req = new Request(req, route.method)
            const _res = new Response(res)
            if (route.method !== "GET") {
                await _req.waitForBody()
            }
            route.fn(_req, _res);
        } else {
            res.write('Route not found.');
        }

        res.end();
    });
    constructor(port: number) {
        this.port = port;
    }
    public connect(fn?: () => void) {
        this.http.listen(this.port, () => {
            if (fn) {fn();}
        });
    }
    public route(path: string, method: Methods, fn: (req: Request, res: Response) => void) {
        this.routes.push({ path, method, fn });
    }
}