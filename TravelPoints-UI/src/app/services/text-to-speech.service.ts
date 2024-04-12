import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  speechSynthesis: SpeechSynthesis = window.speechSynthesis;

  constructor() { }

  speak(text: string): void {
    if (!this.speechSynthesis) {
      console.error('Speech synthesis not supported in this browser.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    this.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.pause();
    }
  }

  resume(): void {
    if (this.speechSynthesis.paused) {
      this.speechSynthesis.resume();
    }
  }

  stop(): void {
    this.speechSynthesis.cancel();
  }
}
