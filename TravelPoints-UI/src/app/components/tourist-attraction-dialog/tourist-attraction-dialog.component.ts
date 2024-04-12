import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TouristAttraction} from "../../models/TouristAttraction";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-destination-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule
  ],
  providers:[TouristAttractionService],
  templateUrl: './tourist-attraction-dialog.component.html',
  styleUrl: './tourist-attraction-dialog.component.css'
})
export class TouristAttractionDialogComponent implements OnInit{
  myForm: any
  id: string = ""
  location: string = ""
  name: string = ""
  description: string = ""
  category: string = ""
  createdAt: string = ""
  offers: string = ""
  entryPrice: number = 0
  title: string = ""
  imageUrl: string = "";

  constructor(private fb: FormBuilder, private touristAttractionService: TouristAttractionService, public dialogRef: MatDialogRef<TouristAttractionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name:[''],
      location: [''],
      category: [''],
      createdAt: [''],
      description: [''],
      entryPrice: [''],
      offers: [''],
      imageUrl:['']
    });
    if(this.data.id == -99) {
      this.title = "New Tourist Attraction"
    } else {
      this.title = "Update: " + this.data.location
      this.myForm.patchValue(this.data)
    }
  }

  onSubmit(){
    if(this.data.id != -99) {
      //this will be populated in the next task
    } else {
      let touristAttraction = new TouristAttraction()
      touristAttraction.location = this.myForm.get('location').value;
      touristAttraction.category = this.myForm.get('category').value;
      touristAttraction.createdAt = this.myForm.get('createdAt').value;
      touristAttraction.description = this.myForm.get('description').value;
      touristAttraction.entryPrice = this.myForm.get('entryPrice').value;
      touristAttraction.offers = this.myForm.get('offers').value;
      touristAttraction.imageUrl = this.myForm.get('imageUrl').value;

      this.touristAttractionService.addTouristAttraction(touristAttraction).subscribe((createdDestination: TouristAttraction) => {
        console.log(createdDestination)
      })

    }

    this.dialogRef.close()
  }


}
