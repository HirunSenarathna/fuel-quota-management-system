/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export interface StationReportItem {
  stationId: number;
  city: string;
  remainingQuota: number;
  totalQuota: number;
}

class PDFGenerator {
  static generateStationReport = (data: StationReportItem[]) => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      if (typeof autoTable !== 'function') {
        console.error('jsPDF-AutoTable plugin is not properly loaded');
        return false;
      }

      // Add title
      doc.setFontSize(18);
      doc.text("Fuel Station Report", 14, 22);

      // Add timestamp
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 32);

      // Prepare table data
      const tableColumn = [
        "Station ID",
        "City",
        "Remaining Quota (L)",
        "Total Quota (L)",
        "Status"
      ];
      
      const tableRows = data.map((item) => {
        const percentRemaining = (item.remainingQuota / item.totalQuota) * 100;
        const status = percentRemaining < 50 ? "Low Quota" : "Sufficient";
        
        return [
          item.stationId,
          item.city,
          item.remainingQuota.toLocaleString(),
          item.totalQuota.toLocaleString(),
          status
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
          4: { cellWidth: 'auto' }
        },
        rowPageBreak: "auto",
        theme: "grid",
      });

      // Access the finalY property safely
      const finalY = (doc as any).previousAutoTable?.finalY || 150;

      doc.setFontSize(12);
      doc.text("Summary", 14, finalY + 15);

      const totalRemainingQuota = data.reduce(
        (sum, item) => sum + item.remainingQuota, 
        0
      );
      
      const totalQuota = data.reduce(
        (sum, item) => sum + item.totalQuota, 
        0
      );
      
      const lowFuelStations = data.filter(station => {
        const percentRemaining = (station.remainingQuota / station.totalQuota) * 100;
        return percentRemaining < 50;
      }).length;

      doc.setFontSize(10);
      doc.text(`Total Stations: ${data.length}`, 14, finalY + 25);
      doc.text(`Total Remaining Quota: ${totalRemainingQuota.toLocaleString()} L`, 14, finalY + 32);
      doc.text(`Total Quota: ${totalQuota.toLocaleString()} L`, 14, finalY + 39);
      doc.text(`Stations with Low Quota: ${lowFuelStations}`, 14, finalY + 46);

      // Add footer
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
          `Page ${i} of ${pageCount} - Fuel Quota Management System`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      // Save the PDF
      doc.save(`Station_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  };
}

export default PDFGenerator;