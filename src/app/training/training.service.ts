import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>()
  private avalibleExercise: Exercise[] = [];
  private runningExercises: Exercise;
  private fbSubs: Subscription[] = [];


  constructor(private db: AngularFirestore, private uiService: UIService) { }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true)
    this.fbSubs.push(this.db
      .collection("availableExcercises")
      .snapshotChanges()
      .pipe(
        map((docArry) => {
          return docArry.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()["name"],
              duration: doc.payload.doc.data()["duration"],
              calories: doc.payload.doc.data()["calories"],
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false)
        this.avalibleExercise = exercises;
        this.exercisesChanged.next([...this.avalibleExercise]);
      }));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExcercises/' + selectedId).update({lastSelected: new Date()})
    this.runningExercises = this.avalibleExercise.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercises });
  }

  getRunningExercise() {
    return { ...this.runningExercises };
  }

  compleateExercise() {
    this.addDatatoDatabase({
      ...this.runningExercises,
      date: new Date(),
      state: "completed",
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progess: number) {
    this.addDatatoDatabase({
      ...this.runningExercises,
      date: new Date(),
      state: "cancelled",
      duration: (this.runningExercises.duration * progess) / 100,
      calories: (this.runningExercises.calories * progess) / 100,
    });
    this.runningExercises = null;
    this.exerciseChanged.next(null);
  }

  fetchCompleatedCanceledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises)
    }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(subs => subs.unsubscribe())
  }

  private addDatatoDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }
}
