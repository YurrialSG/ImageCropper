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
    aspectRatio: 20 / 10, //define o tamanho de área onde vai ser recortada
    zoom: function (e) { // function to allow maxZoom to max size
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

function saveImage() {

  cropper.getCroppedCanvas();

  cropper.getCroppedCanvas({
    width: 160,
    height: 90,
    minWidth: 256,
    minHeight: 256,
    maxWidth: 4096,
    maxHeight: 4096,
    fillColor: '#fff',
    imageSmoothingEnabled: false,
    imageSmoothingQuality: 'high',
  });

  cropper.getCroppedCanvas().toBlob((blob) => {
    const formData = new FormData();

    // Pass the image file name as the third parameter if necessary.
    formData.append('croppedImage', blob/*, 'example.png' */);

    // Use `jQuery.ajax` method for example
    console.log("aki")
    $.ajax({
      url: 'upload.php',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success() {
        console.log('Upload success');
      },
      error() {
        console.log('Upload error');
      },
    });
  }/*, 'image/png' */);
}