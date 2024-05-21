import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent implements OnInit {
  @Input() letra!: string;
  @Input() palabra!: string;
  public miLetra: string = '';
  public backgroundColor: string = 'white';

  ngOnInit(): void {
    this.setColor();
  }

  onInputChange(): void {
    this.setColor();
  }

  setColor(): void {
    if (this.miLetra) {
      const indexInWord = this.palabra.indexOf(this.miLetra);
      if (indexInWord === -1) {
        this.backgroundColor = 'grey';
      } else if (this.palabra[indexInWord] === this.miLetra && this.palabra.indexOf(this.miLetra) === this.palabra.indexOf(this.letra)) {
        this.backgroundColor = 'green';
      } else {
        this.backgroundColor = 'orange';
      }
    }
  }
}
