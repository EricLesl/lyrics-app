import { Component } from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';
import { GeniusService } from './genius.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = '';
  lyrics: string = '';
  songInfo: any = null;

  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private geniusService: GeniusService
  ) {}

  startListening(): void {
    this.speechRecognitionService.startListening().then(
      (transcript) => {
        this.text = transcript;
        this.searchSong(transcript);
      },
      (error) => console.error(error)
    );
  }

  searchSong(query: string): void {
    this.geniusService.searchSong(query).subscribe({
      next: (response) => {
        if (response && response.response.hits.length > 0) {
          // Assuming the first hit is the most relevant one
          const firstHit = response.response.hits[0].result;
          this.songInfo = {
            title: firstHit.title,
            artist: firstHit.primary_artist.name,
            geniusUrl: firstHit.url // URL to view the song on Genius
          };
        } else {
          this.songInfo = null;
        }
      },
      error: (error) => console.error('Error fetching song:', error)
    });
  }
}
