import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipmentListService } from '../equipment-list/equipment-list.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent implements OnInit {
  equipmentForm!: FormGroup;
  showPopup: boolean = false;
  addResponse : string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private equipmentService: EquipmentListService) {
    
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.equipmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      purchase: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      scheduleMaintainance: ['', Validators.required],
      emailAlert: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      const formData = this.equipmentForm.value;
      formData.emailAlert = Number(formData.emailAlert);
      formData.scheduleMaintainance = formData.scheduleMaintainance+"T00:00:00.000Z";
      this.equipmentService.addEquipment(formData).subscribe(
        (response) => {
          this.addResponse = "The Equipment Added Successfully";
          this.showPopup = true; // Set showPopup to true to display the popup
          setTimeout(() => {
          this.showPopup = false; // Hide the popup after a certain period of time
        }, 2000);
          this.equipmentForm.reset();
        },
        (error) => {
          this.addResponse = 'Error adding equipment';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  formatDate(dateString: string): string {
    // Split the date string into year, month, and day components
    const [year, month, day] = dateString.split('-');
  
    // Rearrange the components in the "dd-MM-yyyy" format
    return `${day}-${month}-${year}`;
  }
}
