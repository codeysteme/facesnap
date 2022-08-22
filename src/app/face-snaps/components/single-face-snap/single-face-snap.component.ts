import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snap.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  textSnap!: string;

  constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.textSnap = "Oh Snap!";
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onAddSnap(faceSnapId: number): void {
    if (this.textSnap === "Oh Snap!") {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId).pipe(
        tap(() => this.textSnap = "Oops, unSnap!")
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, false).pipe(
        tap(() => this.textSnap = "Oh Snap!")
      );
    }
  }
}
