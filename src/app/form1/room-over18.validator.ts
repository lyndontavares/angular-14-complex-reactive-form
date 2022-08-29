import { Injectable } from "@angular/core";
import { ValidatorFn, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class RoomOver18Validator {
    public onlyAccessRoomsOver18(): ValidatorFn {
      return (formGroup: FormGroup) => {
        const ageControl = formGroup.get('age');
        const roomControl = formGroup.get('room');

        if (!ageControl || !roomControl) {
          return null;
        }

        const ageValue = ageControl.value;

        if (!ageValue) {
          return null;
        }

        if (ageValue >= 18) {
          return null;
        }

        const roomsValue = roomControl.value;

        if (!roomsValue) {
          return null;
        }

        if (roomsValue.value === 'room-2' || roomsValue.value === 'room-3') {
          roomControl.setErrors({'onlyAccessRoomsOver18': true});
          return null;
        }

        return null;
      };
    }
  }
