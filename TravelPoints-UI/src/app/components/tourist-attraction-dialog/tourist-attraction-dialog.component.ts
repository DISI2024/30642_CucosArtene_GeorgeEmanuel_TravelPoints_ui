import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TouristAttraction} from "../../models/TouristAttraction";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

const FORM_NAME: string = "name"
const FORM_LOCATION: string = "location"
const FORM_CATEGORY: string = "category"
const FORM_CREATED_AT: string = "createdAt"
const FORM_DESCRIPTION: string = "descriptionText"
const FORM_ENTRY_PRICE: string = "entryPrice"
const FORM_OFFERS: string = "offers"
const FORM_IMAGE_PATH: string = "imagePath"
const FORM_OPENING_TIME: string = "openingTime"
const FORM_CLOSING_TIME: string = "closingTime"
const FORM_CONTACT_INFO: string = "contactInfo"
const FORM_ADDRESS: string = "address"

@Component({
  selector: 'app-destination-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    NgForOf
  ],
  providers: [TouristAttractionService],
  templateUrl: './tourist-attraction-dialog.component.html',
  styleUrl: './tourist-attraction-dialog.component.css'
})

export class TouristAttractionDialogComponent implements OnInit {
  myForm: any
  id: string = ""
  location: string = ""
  name: string = ""
  descriptionText: string = ""
  category: string = ""
  createdAt: string = ""
  offers: string = ""
  entryPrice: number = 0
  title: string = ""
  imagePath: string = "";
  openingTime: string = ""
  closingTime: string = ""
  contactInfo: string = ""
  address: string = ""
  timeSlots: string[] = [];

  constructor(private fb: FormBuilder, private touristAttractionService: TouristAttractionService, public dialogRef: MatDialogRef<TouristAttractionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.generateTimeSlots()
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [''],
      location: [''],
      category: [''],
      createdAt: new FormControl({value: '', disabled: true}),
      descriptionText: [''],
      entryPrice: [''],
      offers: [''],
      imagePath: [''],
      openingTime: [''],
      closingTime: [''],
      contactInfo: [''],
      address: ['']
    });
    if (this.data.id == -99) {
      this.title = "New Tourist Attraction"
    } else {
      this.title = "Update: " + this.data.location
      this.myForm.patchValue(this.data)
    }
  }

  onSubmit() {
    let touristAttraction = new TouristAttraction()
    touristAttraction.name = this.myForm.get(FORM_NAME).value;
    touristAttraction.location = this.myForm.get(FORM_LOCATION).value;
    touristAttraction.category = this.myForm.get(FORM_CATEGORY).value;
    touristAttraction.createdAt = this.myForm.get(FORM_CREATED_AT).value;
    touristAttraction.descriptionText = this.myForm.get(FORM_DESCRIPTION).value;
    touristAttraction.entryPrice = this.myForm.get(FORM_ENTRY_PRICE).value;
    touristAttraction.offers = this.myForm.get(FORM_OFFERS).value;
    touristAttraction.imagePath = this.myForm.get(FORM_IMAGE_PATH).value;
    touristAttraction.openingTime = this.myForm.get(FORM_OPENING_TIME).value;
    touristAttraction.closingTime = this.myForm.get(FORM_CLOSING_TIME).value;
    touristAttraction.contactInfo = this.myForm.get(FORM_CONTACT_INFO).value;
    touristAttraction.address = this.myForm.get(FORM_ADDRESS).value;
    console.log(touristAttraction)
    if (this.data.id != -99) {
      this.id = this.data.id
      touristAttraction.attractionId = this.data.attractionId
      this.touristAttractionService.updateTouristAttraction(touristAttraction).subscribe(() => {
      })
    } else {
      this.touristAttractionService.addTouristAttraction(touristAttraction).subscribe(() => {
      })

    }

    this.dialogRef.close()
  }

  generateTimeSlots() {
    const startTime = 8;
    const endTime = 24;

    for (let hour = startTime; hour < endTime; hour++) {
      this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      this.timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    this.timeSlots.push("00:00");
  }
}
