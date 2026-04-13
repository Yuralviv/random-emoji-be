import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

type BrowserRequest = Request & {
  browser?: string;
};

type EmojiResponse = {
  emoji: string;
  browser: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEmoji(
    @Req() request: BrowserRequest,
    @Query('index') index?: string,
  ): EmojiResponse {
    const parsedIndex = index === undefined ? undefined : Number(index);

    return {
      emoji: this.appService.getEmoji(parsedIndex),
      browser: request.browser ?? 'Unknown Client',
    };
  }

  @Get('list')
  getEmojiList(): string[] {
    return this.appService.getEmojiList();
  }

  @Get('random')
  getEmojiByIndex(@Query('index') index?: string): string {
    const parsedIndex = index === undefined ? 0 : Number(index);
    return this.appService.getEmojiByIndex(parsedIndex);
  }
}
