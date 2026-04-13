import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji(index?: number): string {
    const emojis = this.getEmojiList();

    if (index === undefined || Number.isNaN(index)) {
      return emojis[Math.floor(Math.random() * emojis.length)];
    }

    if (index < 0 || index >= emojis.length) {
      throw new Error('Index out of bounds');
    }

    return emojis[index];
  }


  getEmojiList(): string[] {
    return ['😊', '😂', '😍', '🤔', '😎'];
  }

  getEmojiByIndex(index: number): string {
    const emojis = this.getEmojiList();
    if (index < 0 || index >= emojis.length) {
      throw new Error('Index out of bounds');
    }
    return emojis[index];
  }
}
