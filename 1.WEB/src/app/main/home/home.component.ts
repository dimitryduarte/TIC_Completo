import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $.ajax('http://localhost:3001/api/contato/get', {
      method: 'GET',
      headers: {
        'Authorization':'aaaa'
      }
    })
    .done(function(data)
    {
      console.log("data: ");
      console.log(data);
    })
    .fail(function(xml)
    {
      console.log("xml: ");
      console.log(xml);
    });

  }

}
