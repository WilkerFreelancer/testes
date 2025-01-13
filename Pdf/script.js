const url = './Teste.pdf';  // Coloque o arquivo na mesma pasta que o HTML

let pdfDoc = null;

const container = document.getElementById('pdf-container');
const scale = 1.5; // Escala das páginas

// Renderiza uma página
const renderPage = (num) => {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas'); // Cria o canvas para cada página
    const ctx = canvas.getContext('2d');

    // Define o tamanho do canvas baseado na página
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    const renderTask = page.render(renderContext);
    renderTask.promise.then(() => {
      container.appendChild(canvas); // Adiciona a página ao contêiner
    });
  });
};

// Carrega o PDF e renderiza todas as páginas
pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    renderPage(i); // Renderiza todas as páginas
  }
}).catch((err) => {
  console.error(`Erro ao carregar o PDF: ${err.message}`);
});
