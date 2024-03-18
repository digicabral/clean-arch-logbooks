type Context = {
    body: Record<string, string>;
    params: Record<string, string>;
    headers: Record<string, string>;
};

type Response = {
    status: number;
    body: any;
};

type HttpHandler = (req: Context) => Promise<Response>;

type RouteParams = {
    method: string;
    path: string;
    handler: HttpHandler;
};

interface IHttpServer {
    listen(port: number): void;
    route({ method, path, handler }: RouteParams): void;
}

export { Context, HttpHandler, IHttpServer, Response, RouteParams };
