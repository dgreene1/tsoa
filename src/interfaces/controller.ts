export interface TsoaControllerOptions<TTransformedRequestOutput> {
  transformIncomingRequest?: (request: unknown) => TTransformedRequestOutput;
}

export class Controller<TTransformedRequestOutput = unknown> {
  private statusCode?: number = undefined;
  private headers = {} as { [name: string]: string | undefined };
  public request: TTransformedRequestOutput;
  public transformIncomingRequest?: TsoaControllerOptions<TTransformedRequestOutput>['transformIncomingRequest'];

  constructor(options?: TsoaControllerOptions<TTransformedRequestOutput>) {
    if (options && options.transformIncomingRequest) {
      this.transformIncomingRequest = options.transformIncomingRequest;
    }
  }

  public setStatus(statusCode: number) {
    this.statusCode = statusCode;
  }

  public getStatus() {
    return this.statusCode;
  }

  public setHeader(name: string, value?: string) {
    this.headers[name] = value;
  }

  public getHeader(name: string) {
    return this.headers[name];
  }

  public getHeaders() {
    return this.headers;
  }
}

export interface TsoaControllerOptionsWithTransform<TTransformedRequestOutput> extends TsoaControllerOptions<TTransformedRequestOutput> {
  transformIncomingRequest: TsoaControllerOptions<TTransformedRequestOutput>['transformIncomingRequest'];
}

export class ControllerWithTransform<TTransformedRequestOutput> extends Controller {
  public transformIncomingRequest: TsoaControllerOptions<TTransformedRequestOutput>['transformIncomingRequest'];

  constructor(options: TsoaControllerOptionsWithTransform<TTransformedRequestOutput>) {
    super(options);
  }
}
