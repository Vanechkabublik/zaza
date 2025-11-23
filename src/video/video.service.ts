import { Injectable } from '@nestjs/common';
import {ReplicateService} from "../replicate.service";
import {VideoBaseDto} from "./dto/videobase.dto";

@Injectable()
export class VideoService {
    constructor(private  replicate: ReplicateService) {
    }

    async genVeo3(data: VideoBaseDto, url?: string) {
        const result = await this.replicate.genVideoForVeo3(data, url);
        return {
            success: true,
            data: {
                result
            }
        }
    }
}
