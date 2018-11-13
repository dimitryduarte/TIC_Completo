import { Component, OnInit } from '@angular/core';
import axios from 'axios';
var cors = require('cors');

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Optionally the request above could also be done as
    axios.get('http://localhost:3001/api/contato/get', {
      headers:{
        'authorization': 'aaa',
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}
