import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snap.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  textSnap!: string;

  constructor(private faceSnapsService: FaceSnapsService, private route: Router) { }

  ngOnInit(): void {
    this.textSnap = "Oh Snap!";
  }

  onAddSnap(): void {
    if (this.faceSnap.snaps <= 0) {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id);
      this.textSnap = "Oops, unSnap!";
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, false);
      this.textSnap = "Oh Snap!";
    }
  }

  onViewFaceSnap(): void {
    this.route.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

}
