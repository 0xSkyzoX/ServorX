import http from 'http'
import Request from '../../lib/Request';
import Response from '../../lib/Response';
import { Methods } from '..';

export enum Method {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    TRACE = "TRACE",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD"
  }
  

interface SXR {
    path: string;
    method: Methods;
    fn: (req: Request, res: Response ) => void;
}