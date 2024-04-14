import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {TextToSpeechService} from "../../services/text-to-speech.service";

@Component({
  selector: 'app-objective-details-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './tourist-attraction-details-dialog.component.html',
  styleUrl: './tourist-attraction-details-dialog.component.css'
})
export class TouristAttractionDetailsDialogComponent {
  constructor(
    private textToSpeechService: TextToSpeechService,
    @Inject(MAT_DIALOG_DATA) public description: string) {
  }

  speak() {
    this.textToSpeechService.speak(this.description);
  }

  pause() {
    this.textToSpeechService.pause();
  }

  resume() {
    this.textToSpeechService.resume();
  }

  stop() {
    this.textToSpeechService.stop();
  }
}
