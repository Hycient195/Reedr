const settingsModal = document.getElementById("settingsModal");
const settingsButton = document.getElementById("settingsButton")
const fileViewer = document.getElementById("fileViewer");
const pdfViewer = document.getElementById("pdfViewer");
const body = document.getElementById("body");
const pageWrapper = document.getElementById("pageWrapper");
const settingsContainer = document.getElementById("settingsContainer");
const pageNamecontainer = document.getElementById("pageNamecontainer");
const page = document.querySelector(".page");
const head = document.getElementById("head");

function toggleSettings() {
  if (settingsModal.style.display !== "block") {
    settingsModal.style.display = "block";
  } else {
    settingsModal.style.display = "none";
  }
}

function changeFont(arg) {
  pdfViewer.style.fontFamily = arg.value;
  fileViewer.style.fontFamily = arg.value;
  console.log(arg.value)
}

function changeFontSize(arg) {
  pdfViewer.childNodes.forEach(superchild => {
    superchild.childNodes.forEach(child => {
      console.log(child.style.scale)
      child.style.scale = arg.value;
    })
  })
  fileViewer.childNodes.forEach(superchild => {
    superchild.childNodes.forEach(child => {
      console.log(child.style.scale)
      child.style.fontSize = `${arg.value * 14}px`;
    })
  })
}

let isZoomSelected = false;
var style = document.createElement('style');
style.innerHTML = `
  .text-item:hover {
    transform: scale(1.2);
    background-color: inherit;
    z-index: 2;
    border: 1px solid #120C8A !important;
  }
  div.wordViewer > *:hover {
    transform: scale(1.2);
    background-color: inherit;
    z-index: 2;
    border: 1px solid #120C8A !important;
  }
`;

function toggleZoom() {
  pdfViewer.classList.contains("hover:[&_span]:bg-[inherit]") ? pdfViewer.classList.remove("hover:[&_span]:bg-[inherit]") : pdfViewer.classList.add("hover:[&_span]:bg-[inherit]")
  pdfViewer.classList.contains("hover:[&_span]:[transform:scale(1.3)]") ? pdfViewer.classList.remove("hover:[&_span]:[transform:scale(1.3)]") : pdfViewer.classList.add("hover:[&_span]:[transform:scale(1.3)]")
  pdfViewer.classList.contains("hover:[&_span]:border") ? pdfViewer.classList.remove("hover:[&_span]:border") : pdfViewer.classList.add("hover:[&_span]:border")
  pdfViewer.classList.contains("hover:[&_span]:border-violet-800") ? pdfViewer.classList.remove("hover:[&_span]:border-violet-800") : pdfViewer.classList.add("hover:[&_span]:border-violet-800")
  pdfViewer.classList.contains("hover:[&_span]:z-[2]") ? pdfViewer.classList.remove("hover:[&_span]:z-[2]") : pdfViewer.classList.add("hover:[&_span]:z-[2]")
  pdfViewer.classList.contains("hover:[&_span]:px-2") ? pdfViewer.classList.remove("hover:[&_span]:px-2") : pdfViewer.classList.add("hover:[&_span]:px-2")

  fileViewer.classList.contains("hover:[&>*>*]:bg-[inherit]") ? fileViewer.classList.remove("hover:[&>*>*]:bg-[inherit]") : fileViewer.classList.add("hover:[&>*>*]:bg-[inherit]")
  fileViewer.classList.contains("hover:[&>*>*]:[transform:scale(1.3)]") ? fileViewer.classList.remove("hover:[&>*>*]:[transform:scale(1.3)]") : fileViewer.classList.add("hover:[&>*>*]:[transform:scale(1.3)]")
  fileViewer.classList.contains("hover:[&>*>*]:border") ? fileViewer.classList.remove("hover:[&>*>*]:border") : fileViewer.classList.add("hover:[&>*>*]:border")
  fileViewer.classList.contains("hover:[&>*>*]:border-violet-800") ? fileViewer.classList.remove("hover:[&>*>*]:border-violet-800") : fileViewer.classList.add("hover:[&>*>*]:border-violet-800")
  fileViewer.classList.contains("hover:[&>*>*]:z-[2]") ? fileViewer.classList.remove("hover:[&>*>*]:z-[2]") : fileViewer.classList.add("hover:[&>*>*]:z-[2]")
  fileViewer.classList.contains("hover:[&>*>*]:px-2") ? fileViewer.classList.remove("hover:[&>*>*]:px-2") : fileViewer.classList.add("hover:[&>*>*]:px-2")
}

function togglePageColor(arg1, arg2) {
  var style = document.createElement('style');
  style.innerHTML = `
    body, main#page-main, #settingsContainer, a#confirm-nd-proceed {
      background-color: ${arg1} !important;
      color: ${arg2} !important;
    }
    
    #settingsModal, #settingsModal button:not(.color-changer), #settingsContainer button:not(.color-changer), #pageNamecontainer,  #settingsContainer label:not(.selector) {
      background-color: ${arg1} !important;
      color: ${arg2} !important;
      border: 1px solid ${arg2} !important
    }

    .sign-in-settingsModal {
      background-color: ${arg2} !important;
      color: ${arg1} !important;
      border: 1px solid ${arg1} !important
    }

    #settingsModal select {
      color: ${arg2} !important;
    }

    a#confirm, div#foot-banner, .page, .toggle-inverse, .wordViewer, #pageWrapper, #fileViewer, #pdfViewer {
      background-color: ${arg2} !important;
      color: ${arg1} !important;
    }
  `;
  var ref = document.querySelector('script');
  ref.parentNode.insertBefore(style, ref);
}

function setHomePageColor(arg1, arg2) {
  var style = document.createElement('style');
  style.innerHTML = `
    main, #settingsContainer, a.get-started-inverse {
      background-color: ${arg1} !important;
      color: ${arg2} !important;
    }
    
    #settingsModal, #settingsModal a, #settingsModal button:not(.color-changer), #settingsContainer button:not(.color-changer), #pageNamecontainer,  #settingsContainer label:not(.selector) {
      background-color: ${arg1} !important;
      color: ${arg2} !important;
      border: 1px solid ${arg2} !important
    }

    #settingsModal select {
      color: ${arg2} !important;
    }

     a.get-started, #bottom, #footer, #description {
      background-color: ${arg2} !important;
      color: ${arg1} !important;
    }
  `;
  var ref = document.querySelector('script');
  ref.parentNode.insertBefore(style, ref);
}



/* ================================= */
/* Handler Function For Reading Text */
/* ================================= */
function readText() {
  if (fileInput.files.length > 0){
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const newFileReader = new FileReader();
  
    newFileReader.onload = function(e) {
      if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        mammoth.extractRawText({ arrayBuffer: e.target.result })
        .then((result) => {
          console.log(result.value)
          var utterance = new SpeechSynthesisUtterance(result.value);
          window.speechSynthesis.speak(utterance);
        });
  
      } else if (file.type === 'application/pdf') {
  
        pdfjsLib.getDocument(e.target.result).promise.then(async (pdfDocument) => {
          const numPages = pdfDocument.numPages;
          let globalPDFTextContent = "";
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              const page = await pdfDocument.getPage(pageNum);
              const textContent = await page.getTextContent();
              const textItems = textContent.items;
              textItems.forEach((textItem, index) => {
                console.log(textItem)
                globalPDFTextContent += textItem.str;
              });
            }
          var utterance = new SpeechSynthesisUtterance(globalPDFTextContent);
          window.speechSynthesis.speak(utterance);
        })
      } else {
        fileViewer.innerHTML = `<p>Unsupported file type. Unable to display.</p>`;
      }
    }
    newFileReader.readAsArrayBuffer(file);
  }
}

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const fileViewer = document.getElementById('fileViewer');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;

      if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        displayDocxContent(arrayBuffer);
      } else if (file.type === 'application/pdf') {
        displayPdfContent(arrayBuffer);
      } else {
        fileViewer.innerHTML = `<p>Unsupported file type. Unable to display.</p>`;
      }
    };
    reader.readAsArrayBuffer(file);
  }
}

function displayDocxContent(arrayBuffer) {
  const pdfViewer = document.getElementById("pdfViewer");
  pdfViewer.textContent = "";
  const options = {
    styleMap: [
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
      "p[style-name='Heading 4'] => h4:fresh",
      "p[style-name='Heading 5'] => h5:fresh",
      "p[style-name='Heading 6'] => h6:fresh",
      "p[style-name='Normal'] => p",
      "p[style-name='Abstract'] => blockquote",
      "b => strong",
      "i => em",
    ],
    margin: { top: "20pt", right: "20pt", bottom: "20pt", left: "20pt" },
    fontSizes: [
      { size: "12pt", element: ["p", "span"] },
      { size: "14pt", element: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    ],
    defaultParagraphStyle: {
      textAlign: "justify",
      fontSize: "12pt",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      margin: "0",
      "page-break-before": "auto", // Add page break before each paragraph
    },
  };

  mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options)
    .then((result) => {
      // console.log(result.value)
      // Create a new style element
      // var style = document.createElement('style');
      // style.innerHTML = `
      //   /* Add your CSS rules */
      //   body {
      //     font-family: Arial, sans-serif; /* Change as needed */
      //     font-size: 14px; /* Change as needed */
      //   }
      //   p {
      //     text-align: center; /* Change as needed */
      //   }
      //   /* Add more rules as needed */
      // `;
      // // Get the first script tag
      // var ref = document.querySelector('script');
      // // Insert the new style element before the first script tag
      // ref.parentNode.insertBefore(style, ref);
      const pageContainer = document.createElement('div');
      pageContainer.className = 'wordViewer';
      pageContainer.innerHTML = result.value;
      fileViewer.appendChild(pageContainer)
      
    })
    .catch((error) => {
      console.error(error);
    });
    }

/* ===================== */
/* Handler for PDF Files */
/* ===================== */
async function displayPdfContent(arrayBuffer) {
  const textContainer = document.getElementById('fileViewer');
  const pdfViewer = document.getElementById("pdfViewer");
  textContainer.textContent = "";

  
  pdfjsLib.getDocument(arrayBuffer).promise.then(async (pdfDocument) => {
  const numPages = pdfDocument.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pageContainer = document.createElement('div');
      pageContainer.className = 'page';
      pdfViewer.appendChild(pageContainer);

      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 }); // Get the viewport to obtain the page height

      // Set the height of the page container to match the PDF page height
      pageContainer.style.height = `${viewport.height}px`;

      const textContent = await page.getTextContent();
      const textItems = textContent.items;

      textItems.forEach((textItem, index) => {
        console.log(textItem)
        const span = document.createElement('span');
        span.textContent = textItem.str;
        span.className = 'text-item';

        span.style.position = 'absolute';
        span.style.left = `calc(${textItem.transform[4]}px)`;
        span.style.top = `${viewport.height - textItem.transform[5]}px`; // Adjust the y position
        span.style.fontSize = `${textItem.height}px`; // Adjust font size based on height
        // span.style.fontFamily = textItem.fontName

        // Apply font weight
        if (textItem.fontName.includes('Bold')) {
          span.style.fontWeight = 'bold';
        }

        // Check for centralized text
        if (textItem.transform[4] === 0 && textItem.transform[5] === 0) {
          span.classList.add('centralized');
        }
        pageContainer.appendChild(span);
        // pdfViewer.appendChild(span);
      });
    }
  });

  // document.getElementById('fileViewer').textContent = extractedText;
}