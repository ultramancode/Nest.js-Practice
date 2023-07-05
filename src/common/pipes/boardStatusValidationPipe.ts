import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../../boards/boards.status";

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ]

  transform(value: any){
    value = value.toUpperCase();
    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`)
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }


  // 메타데이터 정보 보는 ..
  // transform(value: any, metadata: ArgumentMetadata) {
  //   console.log('value', value);
  //   console.log('metadata', metadata);
  //   return value;
  // }


}
