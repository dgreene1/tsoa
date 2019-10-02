import { Get, Route, ControllerWithTransform } from '../../../src';
import { ModelService } from '../services/modelService';

interface UserInformation {
  firstName: string;
  lastName: string;
  organization: number;
}

/**
 * You would probably get this from import("express").Request but to be library-agnostic, we've created a pretend interface that could be a Koa request, an Express request, etc. It doesn't matter at this point. It's just an object
 */
interface Request {
  /**
   * http request headers
   */
  headers: Record<string, string>;
}

type OutputOfRequestTransform = Request & {
  user: UserInformation;
};

@Route('TransformingRequestWithUserController')
export class TransformingRequestWithUserController extends ControllerWithTransform<OutputOfRequestTransform> {
  constructor() {
    super({
      transformIncomingRequest: request => {
        const resCopy = request as Request;
        return { hello: 'bob' };
      },
    });
  }

  @Get('normalGetMethod')
  public async normalGetMethod(): Promise<TestModel> {
    return Promise.resolve(new ModelService().getModel());
  }

  @Get('deprecatedGetMethod')
  @Deprecated()
  public async deprecatedGetMethod(): Promise<TestModel> {
    return Promise.resolve(new ModelService().getModel());
  }
}
