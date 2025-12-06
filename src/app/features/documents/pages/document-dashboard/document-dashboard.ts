import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentService } from '../../../../core/services/DocumentService';
import { Header } from '../../../../shared/components/header/header';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Header, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './document-dashboard.html',
})
export class DashboardComponent implements OnInit {
  private documentService = inject(DocumentService);
  private sanitizer = inject(DomSanitizer);

  // Ticket fijo (en una app real vendría por URL)
  readonly TICKET = '571cc3a3-5b1f-4855-af26-0de6e7c5475f';

  pdfSafeUrl: SafeResourceUrl | null = null;
  isLoadingPdf = true;
  errorMsg = '';

  ngOnInit() {
    // Cargar el PDF automáticamente al iniciar
    this.loadPdf();
  }

  loadPdf() {
    this.isLoadingPdf = true;
    this.documentService.getDocument(this.TICKET, 'pdf').subscribe({
      next: (blob: Blob) => {
        // Crear URL y decirle a Angular que es segura
        const objectUrl = URL.createObjectURL(blob);
        this.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
        this.isLoadingPdf = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudo cargar la visualización del documento.';
        this.isLoadingPdf = false;
      }
    });
  }

  downloadXml() {
    // Reutilizamos lógica de descarga
    this.downloadFile('xml', 'factura-firmada.xml');
  }

  downloadCdr() {
    this.downloadFile('cdr', 'constancia-recepcion.xml'); // o .zip según corresponda
  }

  private downloadFile(type: 'xml' | 'cdr', fileName: string) {
    this.documentService.getDocument(this.TICKET, type).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert(`Error al descargar ${type.toUpperCase()}`)
    });
  }
}
