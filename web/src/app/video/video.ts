import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'view-video',
  templateUrl: './video.html',
  styleUrls: ['./video.scss']
})
export class VideoComponent {
  title = 'Video';
  video_id = 0;
  video_url = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.video_id = Number(this.route.snapshot.paramMap.get('id'));
    this.video_url = 'http://localhost:3000/video/' + this.video_id;
  }
}
