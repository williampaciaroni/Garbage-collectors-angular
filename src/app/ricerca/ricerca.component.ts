import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../area.service';
import { TokenService } from '../token.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {
  
  
  constructor(private areaService: AreaService, private token:TokenService, private route:ActivatedRoute, private router:Router) { }

  
  onClickSearch(): void{
    var barCode=(<HTMLInputElement>document.getElementById('barCode')).value;
    var area=(<HTMLInputElement>document.getElementById('area')).value;
    
    if(area!=='' && barCode!==''){
      this.router.navigate(['search/result'],{queryParams: {barCode: barCode, area: area}});
    } 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>
      { if(params['barCode']!==undefined)
        {
          (<HTMLInputElement>document.getElementById('barCode')).value=params['barCode']
        }  
      }
    )
  }

  
  onClickCheckBox(){
    if((<HTMLInputElement>document.getElementById('checkBoxArea')).checked===true){
      (<HTMLInputElement>document.getElementById('area')).disabled=true;
      (<HTMLInputElement>document.getElementById('area')).value=this.getUserArea();
    }else{
      (<HTMLInputElement>document.getElementById('area')).disabled=false;
      (<HTMLInputElement>document.getElementById('area')).value="";
    }
    
  }

  isAuthenticated(): boolean{
    return this.token.isAuthenticated();
  }

  private getUserArea(): string{
    return this.token.obtainAreaUser();
  }
  
}
