import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();

  name = signal('Michael');
  protected filter = signal<FlightFilter>({
    from: 'London',
    to: 'New York',
    urgent: false
  });
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flightResult = this.ticketsFacade.flights;

  constructor() {
    effect(() => this.search());
  }


  protected search(): void {
    if (!this.filter().from || !this.filter().to || !this.name()) {
      return;
    }

    this.ticketsFacade.search(this.filter());

    // Resets internal Flight Card state because of new input()
    setTimeout(
      () => this.ticketsFacade.setFlights([{
        id: 999,
        from: 'Rom',
        to: 'Athen',
        date: new Date().toISOString(),
        delayed: false
      }])
    , 10_000);
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
