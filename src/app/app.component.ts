import { Component, OnInit } from '@angular/core';
import { StatusService } from './shared/status.service';
import {MbiObj} from './Mbi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CodeChallenge';
  generatedMbi: string = '';
  obj:MbiObj = new MbiObj('');
  isValid: boolean = false;

  constructor(private statusService: StatusService) { }

  ngOnInit() { }

  onSubmit() { 
    this.statusService
    .postMBI(this.obj)
    .then((res: any) => {
      console.log('verify mbi -> ', res);
      this.isValid = res.result;
    }) 
  }

  getGeneratedMbi(){
    this.statusService
    .getMBI()
    .then((result: any) => {
      console.log('testing ->', result);
      this.generatedMbi = result.mbi;
    });
  }
}
