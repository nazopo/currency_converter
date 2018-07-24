import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dateFormatPipe } from '../util/pipes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  currencies = [];
  currency_names = [];
  default_from:string;
  default_to:string;
  from:string;
  to:string;
  from_rate:number;
  to_rate:number;
  from_value:number = 0;
  to_value:number = 0;
  start_date: string;
  end_date: string;
  name_pairings = {};
  historical_data = {};
  graphValues:any;
  graphString: any;

  constructor(private httpClient:HttpClient){  }

  ngOnInit() {
    
    this.from = 'ALL';
    this.to = 'HKD';
    this.getCurrencies();
    this.default_from = "Albanian Lek";
    this.default_to = "Hong Kong Dollar";
    let dateFormatPipeFilter = new dateFormatPipe();
    this.start_date = dateFormatPipeFilter.transform(new Date(new Date().setDate(new Date().getDate()-30)).toString());
    this.end_date = dateFormatPipeFilter.transform(new Date(Date.now()).toString());
    this.updateRates();
    
  }

  
  updateRates(){
    this.getHistoricalRates();
    this.httpClient.get(`https://api.currencyconverterapi.com/api/v6/convert?q=${this.from}_${this.to},${this.to}_${this.from}&compact=y&apiKey=3065a43b-0b5d-4a28-ae1e-7b16482a820e`)
    .subscribe(
      (data:any) => {
        if(Object.keys(data).length) {
          this.from_rate = data[`${this.from}_${this.to}`].val;
          this.to_rate = data[`${this.to}_${this.from}`].val;
        }
      }
    )
  }
  
  getCurrencies() {

    this.httpClient.get(`https://api.currencyconverterapi.com/api/v6/currencies?apiKey=3065a43b-0b5d-4a28-ae1e-7b16482a820e`)
    .subscribe(
      (data:any) => {
          let result = data;
          this.currencies = result["results"];
          this.currency_names = Object.values(this.currencies).map(function(value) {
            return value.currencyName;
          });
          
          this.currency_names.sort();
                   
          for(var val in this.currencies) {
            this.name_pairings[this.currencies[val].currencyName] = val;
          }
          
      }
    )
  }
  
  getHistoricalRates() {
    
    this.httpClient.get(`https://api.currencyconverterapi.com/api/v6/convert?q=${this.from}_${this.to}&compact=y&date=${this.start_date}&endDate=${this.end_date}&apiKey=3065a43b-0b5d-4a28-ae1e-7b16482a820e`)
    .subscribe(
      (data:any) => {
          this.historical_data = data[`${this.from}_${this.to}`].val;
          
          let tempValues = {nodes: [], edges: []};
          tempValues.nodes = [];
          tempValues.edges = [];
          let dates = Object.keys(this.historical_data);

          Object.keys(this.historical_data).forEach(function(item){
            tempValues.nodes.push({ data: {id: item, name: item + ": " + this.historical_data[item], weight: 100, colorCode: "blue", shapeType: "roundrectangle" }});
            
            if(item != this.start_date) {
              let prev = dates[dates.indexOf(item)-1];
              tempValues.edges.push({ data: { source: prev, target: item, colorCode: "black", strength: 10 }});
            }
        }, this);

        this.graphValues = {nodes: tempValues.nodes, edges: tempValues.edges};
 
      }
    )
  }

  fromSelected(event) {

    this.from = this.name_pairings[event];
    this.updateRates();
  }

  toSelected(event) {

    this.to = this.name_pairings[event];
    this.updateRates();
  }
  
  fromValueChanged(event: number) {
    this.to_value = this.from_rate * event;
  }

  toValueChanged(event: number) {
    this.from_value = this.to_rate * event;
  }

  compareFn(c1: String, c2: String): boolean {
    return c1 === c2;
  }



}