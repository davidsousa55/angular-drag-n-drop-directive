import { Component, ViewChild, ElementRef } from "@angular/core";
import FileSaver from 'file-saver';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
   prepareFilesList(files: Array<any>) {
    for (const item of files) {
      console.log(item);
      if (item.type != 'application/pdf') {
        window.alert("Apenas se pode certificar PDFs");
      }
      else {
        item.progress = 0;
        this.files.push(item);

      }
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  certificatePDF() {
    console.log("botão");
    this.files.forEach(f => this.getPDFCertified(f));
    this.files = [];
  }

  downloadPdf(file) {
    var blob = new Blob([file], { type: "application/pdf" });
    FileSaver.saveAs(blob, file.name);
  }

  getPDFCertified(file){
   
    this.downloadPdf(file);
  }
}
