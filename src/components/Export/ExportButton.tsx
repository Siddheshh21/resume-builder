import { motion } from 'framer-motion';
import { HiOutlineDownload } from 'react-icons/hi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ExportButton.css';

interface ExportButtonProps {
  resumeRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButton({ resumeRef }: ExportButtonProps) {
  const handleExport = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  return (
    <motion.button
      className="export-btn"
      onClick={handleExport}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <HiOutlineDownload className="export-icon" />
      Export PDF
    </motion.button>
  );
}
