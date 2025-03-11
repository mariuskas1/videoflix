import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  
})
export class ToastComponent {
  @Input() show = false;
  @Input() message = '';
  @Input() warning = true;


  hide(){
    this.show = false;
  }

}

