import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any){
        value = value.toUpperCase();
        if(!this.isValidStatus(value)){
            throw new BadRequestException(`Status ${value} not valid`);
        }
        return value;
    }

    private isValidStatus(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}