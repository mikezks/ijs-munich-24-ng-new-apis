import { DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Input, linkedSignal, model, output, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectCdBlink } from '../../../shared/util-cd-visualizer';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  imports: [
    NgStyle, DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card"
      [ngStyle]="{ 'background-color': selected() ? 'rgb(204, 197, 185)' : 'white' }"
    >
      <div class="card-header">
        <h2 class="card-title">{{ editableFlight().from }} - {{ editableFlight().to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: {{ editableFlight().id }}</p>
        <p>Date: {{ editableFlight().date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected() ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', editableFlight().id]"
            class="btn btn-success btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Edit</a>
          <button
            (click)="updateFrom('Miami')"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Update From</button>
          <button
            (click)="delay()"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Delay</button>
        </p>
      </div>
    </div>

    <!-- {{ blink() }} -->
  `
})
export class FlightCardComponent {
  blink = injectCdBlink();

  item = input.required<Flight>();
  itemChange = output<Flight>();
  selected = model(false);

  editableFlight = linkedSignal(() => this.item());

  constructor() {
    effect(() => console.log(this.item()));
  }

  toggleSelection(): void {
    this.selected.update(currentValue => !currentValue);
    // this.selected.set(!this.selected());
  }

  updateFrom(from: string): void {
    this.editableFlight.update(value => ({
      ...value,
      from
    }));
  }

  delay(): void {
    this.itemChange.emit(this.item());
  }
}
