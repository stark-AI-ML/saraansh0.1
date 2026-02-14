import html2pdf from "html2pdf.js";




// PDF Download functionality
document.getElementById("downloadPdf").addEventListener("click", function () {
  // Get the element to convert to PDF
  console.log("downloadBtn");
  const element = document.getElementById("contentToExport");

  // Options for PDF generation
  const options = {
    margin: 10,
    filename: "saraansh.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Create and download the PDF
  html2pdf().set(options).from(element).save();

  // Add a visual feedback for the download
  const btn = document.getElementById("downloadPdf");
  const originalText = btn.innerHTML;
  btn.innerHTML =
    '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Generating PDF...';
  btn.disabled = true;

  // Restore the button after a short delay
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 2000);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("message : ", msg);

  if (msg.type === "render-html") {
    const container = document.querySelector(".summary-container");
    container.innerHTML = msg.html;
  }

  //  if (msg.type === "download-pdf") {
  //   console.log("inside")
  //     const container = document.querySelector(".summary-container");
  //     container.innerHTML = msg.html;

  //   const body = document.querySelector("body");
  //     html2pdf().from(body).save("report.pdf").then(() => {
  //       // Notify background that PDF is done
  //       chrome.runtime.sendMessage({ type: "pdf-done" });
  //       sendResponse({ status: "pdf-done" });
  //     });

  //     return true; // keep channel open for async response
  //   }
});
