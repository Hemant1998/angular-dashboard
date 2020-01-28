import { AbstractControl } from '@angular/forms';

export function checkFieldId(control: AbstractControl) {
  this.dataElements=this.data['content'];
  for (let i in this.dataElements) {
    if(this.dataElements[i].field_id == this.formGroup.get('field_id').value)
          return true;
}
}
