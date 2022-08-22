import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({ providedIn: 'root' })
export class FaceSnapsService {

    readonly apiUrl: string = 'http://localhost:3000/facesnaps';

    constructor(private http: HttpClient) { }

    getAllFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>(this.apiUrl);
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`${this.apiUrl}/${faceSnapId}`);
    }

    snapFaceSnapById(faceSnapId: number, snapType: boolean = true): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,
                snaps: faceSnap.snaps + (snapType ? 1 : -1)
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`${this.apiUrl}/${faceSnapId}`, updatedFaceSnap))
        );
    }

    addFaceSnap(newFaceSnap: FaceSnap): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
            map(value => ({
                ...newFaceSnap,
                id: value.length + 1
            })),
            switchMap(newFaceSnap => this.http.post<FaceSnap>(this.apiUrl, newFaceSnap))
        )
    }
}