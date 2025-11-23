import { Injectable } from '@nestjs/common';
import {ReplicateService} from "../replicate.service";
import {PromptDto} from "./dto/prompt.dto";

@Injectable()
export class PromptService {
    constructor(private  replicate: ReplicateService) {
    }

    async surprise() {
        const free_prompt = "Create an unexpected and original image generation prompt that should surprise the user. The prompt should contain an unusual combination of elements, fantastical or surreal details, and evoke a sense of wonder. Describe a vivid visual scene with elements of magic, technology, or unexplained phenomena. Keep the prompt reasonably detailed but avoid excessive length - aim for 3-5 clear, descriptive sentences that paint a complete picture without unnecessary elaboration. The result should be truly unexpected and captivating. Don't use template clichés, come up with something unique and visually striking."
        const surprise = await this.replicate.prompt(free_prompt)
        const fullPrompt = Array.isArray(surprise)
            ? surprise.join('')
            : surprise;
        return {
            success: true,
            data: {
                surprise_prompt: fullPrompt,
            }
        }
    }

    async improve(data: PromptDto) {
        const { prompt } = data
        const improvementTemplate = `Improve this tooltip or modify it as needed, adding more visual detail. Return ONLY the improved tooltip text, without explanation: "${prompt}"`;
        const improve = await this.replicate.prompt(improvementTemplate)
        const fullPrompt = Array.isArray(improve)
            ? improve.join('')
            : improve;
        return {
            success: true,
            data: {
                new_prompt: fullPrompt,
            }
        }
    }
}
