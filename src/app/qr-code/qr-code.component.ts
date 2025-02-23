import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ReactiveFormsModule} from '@angular/forms';
import{FormsModule } from '@angular/forms';
import QRCode from 'qrcode';
@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent {
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;
  
  public inputText: string = '';
  public qrCodeDataUrl: string = '';
  public isError: boolean = false;
  public errorMessage: string = '';

  async generateQRCode() {
    if (!this.inputText.trim()) {
      this.isError = true;
      this.errorMessage = 'Please enter some text';
      return;
    }

    try {
      this.isError = false;
      this.errorMessage = '';
      
      const canvas = this.qrCanvas.nativeElement;
      await QRCode.toCanvas(canvas, this.inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      this.qrCodeDataUrl = canvas.toDataURL();
    } catch (error) {
      this.isError = true;
      this.errorMessage = 'Failed to generate QR code';
      console.error('Error generating QR code:', error);
    }
  }

  downloadQRCode() {
    if (!this.qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = this.qrCodeDataUrl;
    link.click();
  }
}
