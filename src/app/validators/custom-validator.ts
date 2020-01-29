import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';

export function checkFieldId(control: AbstractControl,dataService:DataServiceService) :ValidatorFn{
  console.log("hello");
  return (control: AbstractControl) => {

  dataService.getDatas().subscribe(res=>{
    console.log("inside validator");
    console.log(res);
  })
  return { 'data' : { value: control.value } };
}
}
