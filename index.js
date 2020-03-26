const uploadedImageDiv = document.getElementById("uploadedImage");
const fileUpload = document.getElementById("fileUpload");
fileUpload.addEventListener("change", getImage, false);
let cropper = null;
let myGreatImage = null;
const croppedImage = document.getElementById("croppedImage");

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
    autoCropArea: 0.85,
    wheelZoomRatio: 0.02,
    restore: false,
    guides: false,
    highlight: false,
    cropBoxMovable: false,
    aspectRatio: 16 / 9,
    zoom: function (e) { // function to allow maxZoom to max size
        if (e.ratio > 1) {
            e.preventDefault();
            $(this).cropper('zoomTo', 1);
        }
    },

    crop(event) {
      // console.log(
      //   Math.round(event.detail.width),
      //   Math.round(event.detail.height)
      // );
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
}

function mZoom() {

}