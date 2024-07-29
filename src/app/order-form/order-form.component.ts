import { Component } from '@angular/core';
import axios from 'axios';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Option {
  value: any;
  label: string;
}

interface Row {
  product: Option | null;
  quantity: Option | null;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  productOptions: Option[] = [
    { value: 'Product 1', label: 'Product 1' },
    { value: 'Product 2', label: 'Product 2' },
    { value: 'Product 3', label: 'Product 3' },
  ];

  quantityOptions: Option[] = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  rows: Row[] = [{ product: null, quantity: null }];
  showOrder: boolean = false;

  handleAddRow() {
    if (this.rows.length < 8) {
      this.rows.push({ product: null, quantity: null });
    }
  }

  handleProductChange(index: number, selectedOption: Option) {
    this.rows[index].product = selectedOption;
  }

  handleQuantityChange(index: number, selectedOption: Option) {
    this.rows[index].quantity = selectedOption;
  }

  handleShowOrder() {
    this.rows = this.rows.filter(row => row.product && row.quantity);
    this.showOrder = true;
  }

  async handleTextToSpeech() {
    const orderText = this.rows
      .filter(row => row.product && row.quantity)
      .map(row => `your ${row.product!.label} with quantity ${row.quantity!.label}. Thank you for shopping. Have a good day`)
      .join(', ');

    try {
      const response = await axios.get('https://api.voicerss.org/', {
        params: {
          key: 'b4d464d91a03429aaf27a31505dd90c9',
          src: orderText,
          hl: 'en-us',
          r: '0',
          c: 'mp3',
          f: '8khz_8bit_mono'
        },
        responseType: 'blob' // Ensure the response type is set to 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error(error);
    }
  }
}
