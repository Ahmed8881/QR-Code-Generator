import { Component, type ElementRef, ViewChild, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"
import { FormsModule } from "@angular/forms"
import QRCode from "qrcode"

@Component({
  selector: "app-qr-code",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"],
})
export class QrCodeComponent implements OnInit {
  @ViewChild("qrCanvas") qrCanvas!: ElementRef<HTMLCanvasElement>

  public inputText = ""
  public qrCodeDataUrl = ""
  public isError = false
  public errorMessage = ""
  public isDarkMode = false

  ngOnInit() {
    // this.isDarkMode = false
    // Check system preference for dark mode
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      this.isDarkMode = e.matches
    })
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    if (this.qrCodeDataUrl) {
      this.generateQRCode() // Regenerate QR code with new theme colors
    }
  }

  async generateQRCode() {
    if (!this.inputText.trim()) {
      this.isError = true
      this.errorMessage = "Please enter some text"
      return
    }

    try {
      this.isError = false
      this.errorMessage = ""

      const canvas = this.qrCanvas.nativeElement
      await QRCode.toCanvas(canvas, this.inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: this.isDarkMode ? "#FFFFFF" : "#000000",
          light: this.isDarkMode ? "#1a1a1a" : "#FFFFFF",
        },
      })

      this.qrCodeDataUrl = canvas.toDataURL()
    } catch (error) {
      this.isError = true
      this.errorMessage = "Failed to generate QR code"
      console.error("Error generating QR code:", error)
    }
  }

  downloadQRCode() {
    if (!this.qrCodeDataUrl) return

    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = this.qrCodeDataUrl
    link.click()
  }
}

