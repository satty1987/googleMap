import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/api.service';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  title = 'Choose Your Seats';

  seats: any;
  totalSelectedSeats = 0;

  constructor(public dataServiceService: DataServiceService) { }

  ngOnInit(): void {
    const apiURL = '/assets/seats.json';
    this.dataServiceService.getList(apiURL).subscribe((seats: any) => {
      this.seats = seats;
      console.log(seats);
    });
  }
  checkAvailability(seat: any) {
    let seleted ;
    if (seat.available) {
      this.totalSelectedSeats = this.totalSelectedSeats + 1;
      seat.available = false;
      seat.isEdited = true;
      seleted = this.seats.filter((item) => {
        return item.isEdited === true;
      });
      console.log(seleted);
      return;
    }

    if (!seat.available && seat.isEdited) {
      this.totalSelectedSeats = this.totalSelectedSeats - 1;
      seat.available = true;
      seat.isEdited = false;
      seleted = this.seats.filter((item) => {
        return item.isEdited === true;
      });
      console.log(seleted);
    }
    console.log(seat);
  }

}
