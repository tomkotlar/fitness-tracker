import { Exercise } from "./exercise.model";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";



@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  exercisesChanged = new Subject<Exercise[]>()
  private avalibleExercise: Exercise[] = [];
  private runningExercises: Exercise;
  private exercises: Exercise[] = []

constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
    .collection("availableExcercises")
    .snapshotChanges()
    .pipe(map(docArry => {
      return docArry.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories']

        } 
      })
    }))
    .subscribe((exercises: Exercise[]) => {
      this.avalibleExercise = exercises
      this.exercisesChanged.next([...this.avalibleExercise])
    })

  }

  startExercise(selectedId: string) {
    this.runningExercises = this.avalibleExercise.find(
      (ex) => ex.id === selectedId)
    this.exerciseChanged.next({ ...this.runningExercises })
  }

  getRunningExercise() {
    return { ...this.runningExercises }
  }

  compleateExercise() {
    this.exercises.push({ ...this.runningExercises, date: new Date(), state: 'completed' })
    this.runningExercises = null
    this.exerciseChanged.next(null)
  }

  cancelExercise( progess: number ) {
    this.exercises.push({ ...this.runningExercises, 
      date: new Date(), 
      state: 'cancelled', 
      duration: this.runningExercises.duration * progess/100, 
      calories: this.runningExercises.calories * progess/100,
    })
    this.runningExercises = null
    this.exerciseChanged.next(null)
  }

  getCompleatedCanceledExercises() {
   
   return this.exercises.slice()
  }
}
