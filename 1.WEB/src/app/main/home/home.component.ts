import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    axios.get('/api/candidatura/get', {
      headers: {
        'Authorization': 'aaaa'
      },
      proxy: {
        host: 'localhost',
        port: 3001
      }
    })
    .then(function (res)
    {
      console.log(res.data);
    })
    .catch(function (err)
    {
      console.log(err.message);
    });

  }

}
