import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {TouristAttraction} from "../../models/TouristAttraction";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {TouristAttractionDialogComponent} from "../tourist-attraction-dialog/tourist-attraction-dialog.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    HttpClientModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatFabButton,
    NgIf,
    MatPaginatorModule
  ],
  providers: [TouristAttractionService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['attractionId', 'imagePath', 'name', 'location', 'category', 'createdAt', 'descriptionText', 'entryPrice', 'offers', 'actions'];
  dataSource: MatTableDataSource<TouristAttraction> | any
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  constructor(private touristAttractionService: TouristAttractionService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.touristAttractionService.getAllTouristAttractions().subscribe({
      next: (destinations: TouristAttraction[]) => {
        this.dataSource = new MatTableDataSource<TouristAttraction>(destinations);
      }
    })
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.error('Paginator is undefined');
    }
  }

  addItem() {
    const dialogRef = this.dialog.open(TouristAttractionDialogComponent, {
      width: '45vh',
      panelClass: 'mat-dialog-container',
      data: {
        id: -99,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.touristAttractionService.getAllTouristAttractions().subscribe({
        next: (touristAttractions: TouristAttraction[]) => {
          this.dataSource = new MatTableDataSource<TouristAttraction>(touristAttractions);
        }
      })
    });
  }

  deleteItem(touristAttraction: TouristAttraction) {
    this.touristAttractionService.deleteTouristAttractionById(touristAttraction.attractionId).subscribe({
      next: () => {
        this.touristAttractionService.getAllTouristAttractions().subscribe({
          next: (touristAttractions: TouristAttraction[]) => {
            this.dataSource = new MatTableDataSource<TouristAttraction>(touristAttractions);
          }
        })
      },
      error: () => {
        alert('Error deleting touristAttraction')
      }
    });
  }

  editItem(touristAttraction: TouristAttraction) {
    const dialogRef = this.dialog.open(TouristAttractionDialogComponent, {
      width: '45vh',
      panelClass: 'mat-dialog-container',
      data: {
        attractionId: touristAttraction.attractionId,
        name: touristAttraction.name,
        location: touristAttraction.location,
        descriptionText: touristAttraction.descriptionText,
        category: touristAttraction.category,
        createdAt: touristAttraction.createdAt,
        offers: touristAttraction.offers,
        entryPrice: touristAttraction.entryPrice,
        imagePath: touristAttraction.imagePath
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.touristAttractionService.getAllTouristAttractions().subscribe((destinations: TouristAttraction[]) => {
        this.touristAttractionService.getAllTouristAttractions().subscribe({
          next: (touristAttractions: TouristAttraction[]) => {
            this.dataSource = new MatTableDataSource<TouristAttraction>(touristAttractions);
          }
        })
      })
    });
  }


}
