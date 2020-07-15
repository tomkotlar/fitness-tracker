import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true
private exerciseSubscription: Subscription;
private loadingSubscription: Subscription


  constructor(
    private trainingService: TrainingService, private uiService: UIService ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading
    })
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercise) => (this.exercises = exercise)
    );
    this.fetchExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  
  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
  }
}
