# OpenSeadragonCanvasOverlayHd

An [OpenSeadragon](http://openseadragon.github.io) plugin that adds canvas overlay capability and supports multi-images.

Compatible with OpenSeadragon 2.2.0 or greater.

## Documentation

To add a canvas overlay to your OpenSeadragon Viewer, create a new `OpenSeadragon.CanvasOverlayHd` instance, passing the OpenSeadragon viewer and configuration options. 
Configuration options are:
`onRedraw` - callback function that does the actual drawing
`clearBeforeRedraw` (default as true): clear canvas before redrawing. 

For example:

```javascript
const tileSource = {
    Image: {
      xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
      Url: 'http://openseadragon.github.io/example-images/highsmith/highsmith_files/',
      Format: 'jpg',
      Overlap: '2',
      TileSize: '256',
      Size: {
        Height: '9221',
        Width: '7026',
      }
    }
  };

const viewer = new OpenSeadragon({
	collectionMode: true,
	collectionRows: 2,
	tileSources: [
	{ tileSource: tileSource },
	{ tileSource: tileSource },
	{ tileSource: tileSource },
	{ tileSource: tileSource }]
});

const colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c'];
const overlay = new OpenSeadragon.CanvasOverlayHd(viewer, {
	onRedraw: function (opts) {
		const context = opts.context;
		context.fillStyle = colors[opts.index];
		context.beginPath();
		context.arc(150, 150, 150, 0, Math.PI * 2, true);
		context.fill();
	}
});
 ```  

[Demo](https://joshua-gould.github.io/OpenSeadragonCanvasOverlayHd/demo/index.html)
