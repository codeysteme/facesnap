import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snap.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {
  // private destroy$!: Subject<boolean>;
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    // interval(1000).pipe(
    //   //take(1), // lorsque le nombre d'émission en maitriser en amont
    //   takeUntil(this.destroy$),
    //   tap(console.log)
    // ).subscribe();
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  // }

}
