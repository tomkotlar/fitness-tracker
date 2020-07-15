import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'


@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>()

    constructor(private snackBar: MatSnackBar) {}

    showSnackbar(message, action, duration) {
        this.snackBar.open(message,  action, {duration: duration})
    }
}