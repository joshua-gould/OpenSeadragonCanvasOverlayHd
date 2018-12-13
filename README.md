# OpenSeadragonCanvasOverlayHd

An [OpenSeadragon](http://openseadragon.github.io) plugin that adds canvas overlay capability.

Compatible with OpenSeadragon 2.2.0 or greater.

## Documentation

To add a canvas overlay to your OpenSeadragon Viewer, create a new `OpenSeadragon.CanvasOverlayHd` instance, passing the OpenSeadragon viewer and configuration options. 
Configuration options are:
`onRedraw` - callback function that does the actual drawing
`clearBeforeRedraw` (default as true): clear canvas before redrawing. 

For example:

```javascript
const viewer = OpenSeadragon({
    id: 'viewer',
    tileSources: {
        Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
            Url: 'http://content.zoomhub.net/dzis/TDbz_files/',
            Format: 'jpg',
            Overlap: '1',
            TileSize: '254',
            ServerFormat: 'Default',
            Size: {
                Height: '4409',
                Width: '7793'
            }
        }
    }
});

const overlay = OpenSeadragon.CanvasOverlayHd(viewer, {
    onRedraw:function(options) {
      	let context = options.context;
        context.fillStyle = "red";
        context.fillRect(0, 0, 500, 500);            
    },
    clearBeforeRedraw:true
});
 ```  


