import { Injectable } from '@nestjs/common';
import {ReplicateService} from "../replicate.service";

@Injectable()
export class ResultService {
    constructor(private replicateService: ReplicateService) {
    }

    async getResult(id: string) {
        const result = await this.replicateService.getResult(id);
        return {
            success: true,
            data: {
                status: result.status,
                output: result.output || 'null',
                error: result.error || 'null',
                send_data: result.input || 'null',
            }
        }
    }
}
