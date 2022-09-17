import { Component, OnInit } from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner'

@Component({
  selector: 'scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
