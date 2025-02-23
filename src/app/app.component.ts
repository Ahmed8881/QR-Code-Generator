import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrCodeComponent } from "./qr-code/qr-code.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QrCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QR-Code-Generator';
}
