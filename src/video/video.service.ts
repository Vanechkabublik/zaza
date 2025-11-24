import { Injectable } from '@nestjs/common';
import {ReplicateService} from "../replicate.service";
import {VideoBaseDto} from "./dto/videobase.dto";

@Injectable()
export class VideoService {
    constructor(private  replicate: ReplicateService) {
    }

    async genVeo3(data: VideoBaseDto) {
        const result = await this.replicate.genVideoForVeo3(data);
        return {
            success: true,
            data: {
                result
            }
        }
    }

    async genVeo3Fast(data: VideoBaseDto, url?: string) {
        const result = await this.replicate.genVideoForVeo3Fast(data, url);
        return {
            success: true,
            data: {
                result
            }
        }
    }

    async genveo31(data: VideoBaseDto, images?: string[]) {
        const { prompt, generate_audio, duration, aspect_ratio, resolution } = data
        const input: any = {
            prompt: prompt,
            generate_audio: generate_audio,
            duration: duration,
            aspect_ratio: aspect_ratio,
            resolution: resolution
        };

        if (images && images.length > 0) {
            input.reference_images = images;
        }

        const result = await this.replicate.genVideoForVeo31(input);

        return {
            success: true,
            data: result,
        }
    }

    async genveo31Fast(data: VideoBaseDto, imageUrl?: string, lastFrameUrl?: string) {
        const input: any = {
            prompt: data.prompt,
            generate_audio: data.generate_audio,
            duration: data.duration,
            aspect_ratio: data.aspect_ratio,
            resolution: data.resolution
        };

        if (imageUrl) {
            input.image = imageUrl;
        }

        if (lastFrameUrl) {
            input.last_frame = lastFrameUrl;
        }

        const result = await this.replicate.genVideoForVeo31Fast(input);

        return {
            success: true,
            data: result,
        }
    }
}
