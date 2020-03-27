const uploadedImageDiv = document.getElementById("uploadedImage");
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);
let cropper = null;
let myGreatImage = null;
const croppedImage = document.getElementById("croppedImage");

const move = document.getElementById("move");
move.addEventListener("click", mover);

const crop = document.getElementById("crop");
crop.addEventListener("click", cortar);

const maisZoomButton = document.getElementById("maisZoom");
maisZoomButton.addEventListener("click", maisZoom);

const menosZoomButton = document.getElementById("menosZoom");
menosZoomButton.addEventListener("click", menosZoom);

const cropButton = document.getElementById("cropButton");
cropButton.addEventListener("click", cropImage);

function getImage() {
  // console.log("images", this.files[0]);
  const imageToProcess = this.files[0];

  // display uploaded image
  let newImg = new Image(imageToProcess.width, imageToProcess.height);
  newImg.src = imageToProcess;
  newImg.src = URL.createObjectURL(imageToProcess);
  newImg.id = "myGreatImage";
  uploadedImageDiv.appendChild(newImg);
  myGreatImage = document.getElementById("myGreatImage");

  processImage();
}

function processImage() {
  cropper = new Cropper(myGreatImage, {
    viewMode: 1, //restringe a caixa de corte para não exceder o tamanho da tela
    autoCropArea: 0.35, //define o tamanho da área de corte automático 'porcentagem' 0 -> 1
    wheelZoomRatio: 0.02, //define a taxa de zoom ao ampliar a imagem girando o mouse
    restore: false, //Restaure a área cortada após redimensionar a janela
    guides: false, //Mostre as linhas tracejadas acima da caixa de corte
    highlight: true, //Mostre o modal branco acima da caixa de corte 'realce a caixa de corte'
    cropBoxMovable: false, //Ative para mover a caixa de corte arrastando.
    aspectRatio: 30 / 10, //define o tamanho de área onde vai ser recortada
    zoom: function (e) { // função para permitir maxZoom ao tamanho máximo
      if (e.ratio > 1) {
        e.preventDefault();
        $(this).cropper('zoomTo', 1);
      }
    },

    crop(event) {
      // console.log(event.detail.x);
      // console.log(event.detail.y);
      // console.log(event.detail.width);
      // console.log(event.detail.height);
      // console.log(event.detail.rotate);
      // console.log(event.detail.scaleX);
      // console.log(event.detail.scaleY);
      const canvas = this.cropper.getCroppedCanvas();
      croppedImage.src = canvas.toDataURL("image/png");
    }
  });
}

function cropImage() {
  const imgurl = cropper.getCroppedCanvas().toDataURL();
  const img = document.createElement("img");
  img.src = imgurl;
  document.getElementById("cropResult").appendChild(img);
  saveImage()
}

function mover() {
  cropper.setDragMode('move');
}

function cortar() {
  cropper.setDragMode('crop')
}

function menosZoom() {
  cropper.zoom(-0.1);
}

function maisZoom() {
  cropper.zoom(0.1);
}

function saveImage() {

  const imgurl = cropper.getCroppedCanvas().toDataURL();

  var a = document.createElement('a');
  a.href = imgurl;
  a.download = "favicon.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}