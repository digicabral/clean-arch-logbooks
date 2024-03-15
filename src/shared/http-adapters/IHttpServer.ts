type HttpHandler = (req: any, res: any) => void;

type RouteParams = {
    method: string;
    path: string;
    handler: HttpHandler;
};

interface IHttpServer {
    listen(port: number): void;
    route({ method, path, handler }: RouteParams): void;
}

export { HttpHandler, IHttpServer, RouteParams };
