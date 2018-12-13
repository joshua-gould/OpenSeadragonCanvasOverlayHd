// https://github.com/joshua-gould/OpenSeadragonCanvasOverlayHd v1.0.0 Copyright 2018 Joshua Gould
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global.OpenSeadragon = global.OpenSeadragon || {}, global.OpenSeadragon.CanvasOverlayHd = factory());
}(this, (function () { 'use strict';

class CanvasOverlayHd {
  constructor (viewer, options) {
    let _this = this;
    this._viewer = viewer;
    this.backingScale = 1;

    this._containerWidth = 0;
    this._containerHeight = 0;

    this._canvasdiv = document.createElement('div');
    this._canvasdiv.style.position = 'absolute';
    this._canvasdiv.style.left = 0;
    this._canvasdiv.style.top = 0;
    this._canvasdiv.style.width = '100%';
    this._canvasdiv.style.height = '100%';
    this._viewer.canvas.appendChild(this._canvasdiv);

    this._canvas = document.createElement('canvas');
    this._canvasdiv.appendChild(this._canvas);

    this.onRedraw = options.onRedraw || function () {};
    this.clearBeforeRedraw = (typeof (options.clearBeforeRedraw) !== 'undefined') ?
      options.clearBeforeRedraw : true;

    this._viewer.addHandler('update-viewport', function () {
      _this.resize();
      _this._updateCanvas();
    });

    this._viewer.addHandler('open', function () {
      _this.resize();
      _this._updateCanvas();
    });
  }

  canvas () {
    return this._canvas;
  }

  context2d () {
    return this._canvas.getContext('2d');
  }

  clear () {
    this._canvas.getContext('2d').
      clearRect(0, 0, this._containerWidth * this.backingScale, this._containerHeight * this.backingScale);
  }

  resize () {
    let backingScale = 1;
    if (typeof window !== 'undefined' && 'devicePixelRatio' in window) {
      if (window.devicePixelRatio > 1) {
        backingScale = window.devicePixelRatio;
      }
    }
    let backingScaleUpdated = this.backingScale !== backingScale;
    this.backingScale = backingScale;
    if (this._containerWidth !== this._viewer.container.clientWidth || backingScaleUpdated) {
      this._containerWidth = this._viewer.container.clientWidth;
      this._canvasdiv.setAttribute('width', backingScale * this._containerWidth);
      this._canvas.setAttribute('width', backingScale * this._containerWidth);
      this._canvas.style.width = this._containerWidth + 'px';
    }

    if (this._containerHeight !== this._viewer.container.clientHeight || backingScaleUpdated) {
      this._containerHeight = this._viewer.container.clientHeight;
      this._canvasdiv.setAttribute('height', backingScale * this._containerHeight);
      this._canvas.setAttribute('height', backingScale * this._containerHeight);
      this._canvas.style.height = this._containerHeight + 'px';
    }
    this._viewportOrigin = { x: 0, y: 0 };
    let boundsRect = this._viewer.viewport.getBounds(true);
    this._viewportOrigin.x = boundsRect.x;
    this._viewportOrigin.y = boundsRect.y * this.imgAspectRatio;

    this._viewportWidth = boundsRect.width;
    this._viewportHeight = boundsRect.height * this.imgAspectRatio;
    let image1 = this._viewer.world.getItemAt(0);
    this.imgWidth = image1.source.dimensions.x;
    this.imgHeight = image1.source.dimensions.y;
    this.imgAspectRatio = this.imgWidth / this.imgHeight;
  }

  _updateCanvas () {
    let viewportZoom = this._viewer.viewport.getZoom(true);
    let image1 = this._viewer.world.getItemAt(0);
    if (image1) {
      let zoom = image1.viewportToImageZoom(viewportZoom);
      let x = ((this._viewportOrigin.x / this.imgWidth - this._viewportOrigin.x) / this._viewportWidth) *
        (this.backingScale * this._containerWidth);
      let y = ((this._viewportOrigin.y / this.imgHeight - this._viewportOrigin.y) / this._viewportHeight) *
        (this.backingScale * this._containerHeight);

      if (this.clearBeforeRedraw) this.clear();
      let context = this._canvas.getContext('2d');
      context.translate(x, y);
      context.scale(zoom, zoom);
      context.scale(this.backingScale, this.backingScale);
      this.onRedraw({ context: context, x: x, y: y, zoom: zoom });
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}

return CanvasOverlayHd;

})));
