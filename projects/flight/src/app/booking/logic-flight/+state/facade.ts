import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { ticketActions } from "./actions";
import { ticketFeature } from "./reducer";
import { FlightFilter } from "../model/flight-filter";
import { Flight } from "../model/flight";


export function injectTicketsFacade() {
  const store = inject(Store);

  return {
    flights: store.selectSignal(ticketFeature.selectFlights),
    search: (filter: FlightFilter) =>
      store.dispatch(ticketActions.flightsLoad(filter)),
    setFlights: (flights: Flight[]) =>
      store.dispatch(ticketActions.flightsLoaded({ flights })),
    update: (flight: Flight) =>
      store.dispatch(ticketActions.flightUpdate({ flight })),
    reset: () =>
      store.dispatch(ticketActions.flightsClear())
  };
}
