import {BadRequestException, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Replicate from 'replicate';
import {VideoBaseDto} from "./video/dto/videobase.dto";

@Injectable()
export class ReplicateService {
    private replicate: Replicate;

    constructor(private configService: ConfigService) {
        this.replicate = new Replicate({
            auth: this.configService.getOrThrow('REPLICATE_API_TOKEN'),
        });
    }

    async genVideoForVeo3(data: VideoBaseDto, url?: string) {
        const { prompt, generate_audio, duration, resolution, aspect_ratio } = data;

        try {
            const input: any = {
                prompt: prompt,
                duration: duration,
                aspect_ratio: aspect_ratio,
                resolution: resolution,
                generate_audio: generate_audio,
            };

            if (url) {
                input.image = url;
            }

            const prediction = await this.replicate.predictions.create({
                version: "google/veo-3",
                input: input,
                wait: false
            });

            return prediction.id;
        } catch (error) {
            throw new BadRequestException(`Veo-3 API error: ${error.message}`);
        }
    }

    async prompt(prompt: string) {
        try {
            const prediction = await this.replicate.predictions.create({
                version: "google/gemini-2.5-flash",
                input: {
                    prompt: prompt,
                    max_output_tokens: 6000,
                    temperature: 0.7,
                },
                wait: true
            });

            return prediction.output
        } catch (error) {
            throw new BadRequestException(`Gemini Flash API error: ${error.message}`);
        }
    }

    async speech(text: string, voice: string, speed: number) {
        try {
            const prediction = await this.replicate.predictions.create({
                version: "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13",
                input: {
                    text: text,
                    voice: voice,
                    speed: speed,
                },
                wait: false
            });

            return {
                id: prediction.id
            };
        } catch (error) {
            throw new BadRequestException(`Gemini Flash API error: ${error.message}`);
        }
    }

    async generateAudio(prompt: string) {
        try {
            const prediction = await this.replicate.predictions.create({
                version: "google/lyria-2",
                input: {
                    prompt: prompt
                },
                wait: false
            });

            return {
                id: prediction.id
            };
        } catch (error) {
            throw new BadRequestException(`Gemini Flash API error: ${error.message}`);
        }
    }

    async upscale(imageUrl: string, prompt?: string, upscale_factor?: string, compression_quality?: string) {
        try {
            const factor = upscale_factor === 'x4' ? 'x4' : 'x2';
            const quality = compression_quality ? parseInt(compression_quality) : 80;

            const prediction = await this.replicate.predictions.create({
                version: "google/upscaler",
                input: {
                    image: imageUrl,
                    upscale_factor: factor,
                    compression_quality: quality,
                },
                wait: false
            });

            return {
                id: prediction.id
            };
        } catch (error) {
            throw new BadRequestException(`Replicate API error: ${error.message}`);
        }
    }

    async getResult(predictionId: string): Promise<any> {
        try {
            const prediction = await this.replicate.predictions.get(predictionId);
            return prediction;
        } catch (error) {
            throw new BadRequestException(`Replicate API error: ${error.message}`);
        }
    }
}