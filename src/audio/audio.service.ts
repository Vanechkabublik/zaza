import {Body, Injectable} from '@nestjs/common';
import {SpeechDto} from "./dto/speech.dto";
import {ReplicateService} from "../replicate.service";
import {GenDto} from "./dto/gen.dto";

@Injectable()
export class AudioService {
    constructor(private  replicate: ReplicateService) {
    }

    async speech(data: SpeechDto) {
        const { text, voice_id, speed } = data;

        const voice = voice_id || 'af_bella';
        const speechSpeed = speed || 1.0;

        const result = await this.replicate.speech(text, voice, speechSpeed);

        return {
            success: true,
            data: result,
        }
    }

    async generateMusic(data: GenDto) {
        const { prompt } = data;
        const result = await this.replicate.generateAudio(prompt);

        return {
            success: true,
            data: result,
        }
    }
}
