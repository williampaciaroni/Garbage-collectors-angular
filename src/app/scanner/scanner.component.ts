import { Component, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

availableDevices: MediaDeviceInfo[];
currentDevice: MediaDeviceInfo;

  constructor(private router:Router) { }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices=true;
      this.availableDevices=devices;

      for (const device of devices) {
            if (/back|rear|environment/gi.test(device.label)) {
                this.scanner.changeDevice(device);
                this.currentDevice = device;
                break;
            }
        }
      if(this.currentDevice===undefined){
        this.scanner.changeDevice(this.availableDevices[0]);
        this.currentDevice=this.availableDevices[0];
      }
    });

    this.scanner.camerasNotFound.subscribe(()=>{this.hasDevices=false});
    this.scanner.scanComplete.subscribe((result:Result)=>this.qrResult=result);
    this.scanner.permissionResponse.subscribe((perm:boolean)=>this.hasPermission=perm);

  }

  displayCameras(cameras: MediaDeviceInfo[]){
    console.debug('Devices: ',cameras);
    this.availableDevices=cameras;
  }

  handleQrCodeResult(resultString:string){
    console.debug('Result: ',resultString);
    this.qrResultString=resultString;
    this.router.navigate(['/search'],{  queryParams: {barCode: resultString}});
  }

  onDeviceSelectChange(selectedValue:string){
    this.currentDevice=this.scanner.getDeviceById(selectedValue);
  }
}
