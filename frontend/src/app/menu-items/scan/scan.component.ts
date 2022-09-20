import { Component, OnInit } from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner'
import {BarcodeFormat} from '@zxing/library'
import { Router } from '@angular/router';
@Component({
  selector: 'scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  scannerFormats = [BarcodeFormat.QR_CODE];
  currentDevice!: MediaDeviceInfo;
  availableDevices!: MediaDeviceInfo[];
  hasDevices!:boolean;
  hasPermission!:boolean;
  torchEnabled = false;
  tryHarder = false;
  allowEmptyString =  true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  onCamerasFound(devices:MediaDeviceInfo[]):void{
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length)
  }

  onCodeResult(resultString:string){
    this.router.navigate(['/item/' + resultString]);
  }

  onHasPermission(has:boolean){
    this.hasPermission = true;
  }

}
