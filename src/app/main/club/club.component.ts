import { Component, OnInit } from '@angular/core';
import { IClub } from '../../common/IClub';
import { ClubService } from '../../services/club.service';
import { PagedResponse } from '../../common/IPagedResponse';
import {
  AddEvent,
  GridDataResult,
  PageChangeEvent,
  RemoveEvent,
} from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss',
})
export class ClubComponent implements OnInit {
  public gridView: GridDataResult = { data: [], total: 0 };
  public gridData: IClub[] = [];
  public take = 10;
  public skip = 0;
  public editDataItem: undefined | IClub;
  public isNew: boolean = false;
  public clubToRemove: undefined | IClub;
  public isLoading = false;

  constructor(
    private clubService: ClubService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.isLoading = true;
    await this.clubService.getAllClubs(this.skip, this.take).subscribe({
      next: (response: PagedResponse<IClub>) => {
        this.gridView = {
          data: response.items,
          total: response.total,
        };
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  public editHandler(args: AddEvent) {
    this.editDataItem = args.dataItem;
    this.isNew = false;
  }

  public addHandler() {
    this.editDataItem = {
      id: 0,
      name: '',
      description: '',
      contactEmail: '',
      contactNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
    } as IClub;
    this.isNew = true;
  }

  public cancelHandler(): void {
    this.editDataItem = undefined;
  }

  public saveHandler(club: IClub): void {
    this.clubService.save(club, this.isNew).subscribe({
      next: () => {
        this.showSuccess();
        this.loadData();
      },
      error: () => this.showError(),
    });

    this.editDataItem = undefined;
  }

  public removeHandler(args: RemoveEvent): void {
    this.clubToRemove = args.dataItem;
  }

  public cancelDelete(): void {
    this.clubToRemove = undefined;
  }

  public deleteClub(): void {
    if (!this.clubToRemove) return;

    this.clubService.remove(this.clubToRemove.id).subscribe({
      next: () => {
        this.clubToRemove = undefined;
        this.showSuccess();
        this.loadData();
      },
      error: () => this.showError(),
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.take = event.take;
    this.loadData();
  }

  public showError(): void {
    this.notificationService.show({
      content: 'Unable to Save',
      cssClass: 'button-notification',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'error', icon: true },
      hideAfter: 2000,
    });
  }

  public showSuccess(): void {
    this.notificationService.show({
      content: 'Saved Successfully',
      cssClass: 'button-notification',
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'success', icon: true },
      hideAfter: 2000,
    });
  }
}
