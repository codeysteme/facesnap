import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token!: string;

    constructor() { }

    login(): void {
        this.token = "MyFaketoken";
    }

    getToken(): string {
        return this.token;
    }
}