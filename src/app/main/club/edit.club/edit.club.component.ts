import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SVGIcon, saveIcon, cancelIcon } from '@progress/kendo-svg-icons';
import { IClub } from '../../../common/IClub';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit.club.component.html',
  styleUrl: './edit.club.component.scss',
})
export class EditClubComponent {
  public saveIcon: SVGIcon = saveIcon;
  public cancelIcon: SVGIcon = cancelIcon;
  public active = false;

  public editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    contactEmail: new FormControl('', Validators.email),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9 ]{10,15}$'),
    ]),
    addressLine1: new FormControl(),
    addressLine2: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
  });

  @Input() public isNew = false;

  @Input() public set model(club: IClub | undefined) {
    this.editForm.reset(club);

    // toggle the Dialog visibility
    this.active = club !== undefined;
  }

  @Output() cancel: EventEmitter<undefined> = new EventEmitter();
  @Output() save: EventEmitter<IClub> = new EventEmitter();

  public onSave(e: PointerEvent): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e: PointerEvent): void {
    e.preventDefault();
    this.closeForm();
  }

  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
