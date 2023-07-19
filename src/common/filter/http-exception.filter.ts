import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request} from "express";
import { errorContext } from "rxjs/internal/util/errorContext"; //이거 안하니까 reponse.status 가 안먹히네..

@Catch(HttpException)
export class httpExceptionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.message

    response
    .status(status)
    .json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage: errorMessage
    })
  }
}