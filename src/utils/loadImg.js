const loadImage = (url, callback) => {
  var img = new Image();
  img.onload = function () {
    img.onload = null;
    callback(img);
  };
  img.src = url;
};

export default loadImage;
