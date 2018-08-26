var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var canvasWidthRatio = 2.0 / 3.0;
var canvasHeightRatio = 0.5;

// For setting resolution of canvas so that text will not appear blurry
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    var hdMultiplier = 1.5;  // increase for better resolution
    return dpr / bsr * hdMultiplier;
})();

var setCanvasMarginTop = function(event) {
  document.getElementById('game').style.marginTop = (window.innerHeight - canvas.clientHeight) / 2 + "px"
};
var setCanvasResolution = function(event) {
  let canvasMaxWidth = parseInt(window.getComputedStyle(canvas).getPropertyValue("max-width"));
  canvas.width = canvasMaxWidth * canvasWidthRatio * PIXEL_RATIO;
  canvas.height = canvasMaxWidth * canvasHeightRatio * PIXEL_RATIO;
  ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
}

window.onload = function() {
  setCanvasResolution();
  setCanvasMarginTop();
}
window.onresize = function() {
  setCanvasMarginTop();
}