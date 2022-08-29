
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ControlTabService } from "./shared/control-tab.service";
import { FormBasic } from "./shared/form-basic";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent extends FormBasic implements OnInit, AfterViewInit {
  gravando = false
  @ViewChild('form1') form1: any;
  @ViewChild('form2') form2: any;
  @ViewChild('form3') form3: any;
  @ViewChild('form4') form4: any;
  @ViewChild('form5') form5: any;

  constructor(public override fb: FormBuilder, public override controlTabService: ControlTabService) {
    super(fb, controlTabService)
  }

  override ngOnInit() {
    super.ngOnInit()
    //implemente logica aqui
  }
  addForms() {
    this.tabs.push(this.form1)
     this.tabs.push(this.form2)
    this.tabs.push(this.form3)
    this.tabs.push(this.form4)
    this.tabs.push(this.form5)
  }

  override ngAfterViewInit(): void {
    this.addForms()
    super.ngAfterViewInit()
  }

}
