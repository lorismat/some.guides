# Intro

## From drawing to svg

### Select the part of your drawing

- draw the shape to extract (bezier curve)
- select both the shape and **then** the picture
- Object > clip > set

### Retrieve svg method 1: trace from file

- create a new layer on top
- start tracing (bezier curve and edit paths)
- geth help with the layer to see how it looks
- group selection altogether

### Retrieve svg method 2: Object to bitmap

- Object to bitmap: will create paths on the way

### Saving to Optimized svg


    Select the object(s) to export.
    "Resize page to drawing or selection" (File → Document Properties) or Ctrl+Shift+R.
    "Invert selection" (Edit → Invert selection) or !, and Del all other objects.
    "Save As" with Ctrl+Shift+S.
    Select Optimized SVG as the format if you want to use it on the web.


### Implement in the code

2 options:
- read file from .svg file (copy/paste)
- `<img src="/static/image.svg">` read as an image

## From web svg to inkscape

Process here is much simpler:  
- retrieve your `<svg>` from the HTML code
- save it as and `.svg` file
- open it to inkscape
