import jsPDF from "jspdf";

export function generateSimpleBugPDF(bugs) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Bug Report', 20, 20);

    // Content settings
    doc.setFontSize(12);
    let y = 40;

    // Add each bug entry
    bugs.forEach(bug => {
        // Add new page if needed
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.text(`ID: ${bug._id}`, 20, y);
        doc.text(`Severity: ${bug.severity}`, 20, y + 7);
        doc.text(`Title: ${bug.title}`, 20, y + 14);
        doc.text(`Date: ${new Date(bug.createdAt * 1000).toLocaleDateString()}`, 20, y + 21);

        y += 35;
    });

    doc.save('bugs.pdf');
}