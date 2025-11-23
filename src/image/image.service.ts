import { Injectable } from '@nestjs/common';
import {Imagen4UltraDto} from "./dto/imagen-4-ultra.dto";
import {ReplicateService} from "../replicate.service";
import {NanobananoDto} from "./dto/nanobanano.dto";

@Injectable()
export class ImageService {
    constructor(private replicate: ReplicateService) {}

    async genimagen4ultra(data: Imagen4UltraDto) {
        const { prompt, aspect_ratio, output_format } = data
        const result = await this.replicate.replicateimagen4ultra(prompt, aspect_ratio, output_format);

        return {
            success: true,
            data: result,
        }
    }

    async genimagen4fast(data: Imagen4UltraDto) {
        const { prompt, aspect_ratio, output_format } = data
        const result = await this.replicate.replicateimagen4fast(prompt, aspect_ratio, output_format);

        return {
            success: true,
            data: result,
        }
    }

    async gennanobanano(data: NanobananoDto, images?: string[]) {
        const { prompt, output_format } = data;

        const input: any = {
            prompt: prompt,
            output_format: output_format || 'jpg'
        };

        if (images && images.length > 0) {
            input.image_input = images;
        }

        return this.replicate.repgennanobanano(input);
    }

    async gengemini(data: NanobananoDto, images?: string[]) {
        const { prompt, output_format } = data;

        const input: any = {
            prompt: prompt,
            output_format: output_format || 'jpg'
        };

        if (images && images.length > 0) {
            input.image_input = images;
        }

        return this.replicate.repgengemini(input);
    }
}
