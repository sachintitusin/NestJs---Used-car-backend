import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { UserDto } from "src/users/dtos/user-dto";

/**
 * We created this custom decorator to shorten the line in controller.
 * Before we had to write 
 * @ UseInterceptors(new SerializeInterceptor(dto))
 * Now it is shortened to 
 * @ Serialize(DTOName)
 * 
 * @param dto 
 * @returns 
 */
export function Serialize(dto: new (...args:any[]) => {}){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}
    
    /**
     * 
     * @param context Execution context contains everything about request and its lifecycle.
     * @param handler Kind of a reference to the request handler in our controller
     * @returns 
     */
    intercept(context: ExecutionContext, handler: CallHandler):Observable<any>{
        return handler.handle().pipe(
            /**
             * Not the regular Js map. This is map in RxJs.
             * This works on observables, modifying it.
             */
            map((data:any)=>{
               return plainToInstance(this.dto, data, {
                excludeExtraneousValues: true
               })
            })
        )

    }
}