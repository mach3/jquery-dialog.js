
# jquery-dialog.js

Tiny modal window library.


## Usage

```html
<button data-dialog="#my-dialog">Open Dialog</button>

<div style="display: none;">
    <div id="my-dialog">
        <h1>Dialog</h1>
        <p>Dialog content</p>
        <button data-dialog-close>Close</button>
    </div>
</div>
```

With Options:

```html
<button data-dialog="#my-dialog" data-dialog-clone data-dialog-top="100">Open Dialog</button>
```

- **data-dialog-clone** (no value) ... Open dialog with cloned content
- **data-dialog-top** :Number|String ... Specify top position. Centered if "auto".
- **data-dialog-width** :Number ... Specify the width of dialog


## Open dynamically

```javascript
$("#button-dialog").on("click", function(){
    $("<div>")
    .append('\
        <h1>Dialog</h1>\
        <p>Dialog content</p>\
        <button data-dialog-close>Close</button>\
    ')
    .children()
    .dialog({
        width: 640
    });
});
```

### $.fn.dialog([options]) :jQuery

options:

- **top** :Number|String ... Specify top position
- **width** ... Specify the width of dialog


## Configure default options

```javascript
$.dialog.config({
    zIndex: 99,
    className: "dialog",
    containerClassName: "dialog-container",
    width: "60%",
    clone: false,
    duration: 300,
    backgroundColor: "rgba(0, 0, 0, .9)",
    top: "auto"
})
```

- **zIndex** :Number ... z-index of container
- **className** :String ... className of dialog
- **containerClassName** :String ... className of container
- **width** :Number|String ... width fo dialog
- **clone** :Boolean ... Clone the content or not
- **duration** :Number ... Duration millisecond time for fade-in animation
- **backgroundColor** :String ... background-color of container
- **top** :String|Number ... Top position of dialog


## Events

`$.dialog` fires some events.

```javascript
$.dialog.on("close", function(){
    console.log("dialog closed");
});
```

- **close** ... Dialog is closed
- **open** ... Dialog is opened


## Transparent background for legacy (MSIE8 or less)

This example show you the one way to let container's background be transparent
for legacy environment which cannot render with "rgba()".

```css
.dialog-container {
    background-image: url(background.png);
}
```

```javascript
$.dialog.config({
    backgroundColor: "transparent"
});
```