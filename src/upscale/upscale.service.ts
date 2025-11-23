import { Injectable } from '@nestjs/common';
import { ReplicateService } from "../replicate.service";

@Injectable()
export class UpscaleService {
    constructor(private replicateService: ReplicateService) {}

    async upscale(
        url: string,
        upscale_factor?: string,
        compression_quality?: string
    ): Promise<any> {
        const result = await this.replicateService.upscale(url, upscale_factor, compression_quality);
        return {
            success: true,
            data: result,
        }
    }
}