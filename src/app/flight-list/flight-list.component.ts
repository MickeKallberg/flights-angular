import { Component, OnInit } from '@angular/core';
import { Flight } from '../shared/flights';
import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit { // Interfaces är syntax...

  showImages: boolean = false;
  showPeriodTime: boolean = false;
  filteredFlights: Array<Flight>;

  get flightFilter() {
    return this.filter;
  }

  set flightFilter(value) {
    this.filter = value;
    this.filteredFlights = this.filter ? this.filterFlights(this.filter) : this.flights;
  }

  filter: string;
  flights: Array<Flight>;
 
  //Så konstruktorn i angular, ska endast användas för att instansiera värden inte tilldela objekt.
  constructor(private flightService: FlightService) { }

  //Här vill vi tilldela data
  ngOnInit() {
    this.flights = this.flightService.findAll();
    this.filteredFlights = this.flights;
  }

  toggleImages() {
   this.showImages = !this.showImages;
  }

  toggleClock() {
    this.showPeriodTime = !this.showPeriodTime;
  }
// Filtrera över alla fält, om du retunerar true så sparas flight:en i en lista som filtrermetoden retunerar.
  filterFlights(filter: string): Array<Flight> {
    filter = filter.toLowerCase();
    return this.flights.filter(flight => {
      return flight.destination.toLowerCase().indexOf(filter) !== -1 ||
      flight.gate.toLowerCase().indexOf(filter) !== -1 ||
      flight.type.toLowerCase().indexOf(filter) !== -1 ||
      String(flight.number).toLowerCase().indexOf(filter) !== -1;
    });
  }

}
