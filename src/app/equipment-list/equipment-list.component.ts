import { Component, OnInit } from '@angular/core';
import { EquipmentListService } from './equipment-list.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.css'
})
export class EquipmentListComponent implements OnInit {
  equipmentList: any[] = []; // Define a property to store equipment list
  showPopup = false;
  response: string = "";

  constructor(private equipmentListService: EquipmentListService) {}

  ngOnInit(): void {
    this.equipmentListService.getEquipmentList().subscribe((data: any[]) => {
      this.equipmentList = data; // Assign the received data to equipmentList property
    }, (error) => {
      this.response = "Error On Listing !"
      this.showPopup = true; // Set showPopup to true to display the popup
      setTimeout(() => {
        this.showPopup = false; // Hide the popup after a certain period of time
      }, 2000);
    });
  }

  sendEmailNotification(email: string, subject: string, body: string): void {
    this.equipmentListService.sendEmailNotification(email, subject, body)
      .subscribe(() => {
        this.response = "Email Alert Sent Successfully"
        this.showPopup = true; // Set showPopup to true to display the popup
        setTimeout(() => {
          this.showPopup = false; // Hide the popup after a certain period of time
        }, 2000);
      }, (error) => {
        this.response = "Error sending email notification"
        this.showPopup = true; // Set showPopup to true to display the popup
        setTimeout(() => {
          this.showPopup = false; // Hide the popup after a certain period of time
        }, 2000);
      });
  }

  getEmailAlertLabel(alertValue: number): string {
    switch(alertValue) {
        case 0:
            return "Low";
        case 1:
            return "Medium";
        case 2:
            return "High";
        default:
            return ""; // Handle unexpected values
    }
}

}
