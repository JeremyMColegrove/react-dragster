# useDragster

`useDragster` is a React hook designed to simplify drag and drop event handling by providing easy-to-use abstractions for drag enter, drag leave, and drop events. It also addresses common browser bugs related to these events, ensuring a smooth and reliable user experience.

## Installation

`npm install react-dragster`

## Usage

Importing:

`import useDragster from 'react-dragster';`

Example:

```Javascript
import React from 'react';
import useDragster from 'use-dragster';

const YourComponent = () => {

  // Initialize the useDragster hook
  const watcherRef = useDragster({
    dragsterEnter: () => console.log('Drag entered!'),
    dragsterLeave: () => console.log('Drag left!'),
    dragsterDrop: () => console.log('Item dropped!'),
    options: {
      preventDefault:false,
      stopPropagation: false
    }
  });

  return (
      {/* Apply the ref to the element you want to monitor for drag leave, enter, and drop events */}
      <div ref={watcherRef} onDragOver={...} >
        {/* your draggable will trigger the events, properly*/}
        <div draggable/>
      </div>
  );
};

export default YourComponent;
```

## API:

`useDragster(props: DragsterProps): watcherRef: React.MutableRefObject<any> `

## DragsterProps:

-   `dragsterEnter?: (e: React.DragEvent) => any`: Function to be called on drag enter event.
-   `dragsterLeave?: (e: React.DragEvent) => any`: Function to be called on drag leave event.
-   `dragsterDrop?: (e: React.DragEvent) => any`: Function to be called on drop event.
-   `options?: {preventDefault?:boolean, stopPropagation?:boolean}`: Options to change the hook behavior. Default: `{preventDefault:true, stopPropagation:true}`.

> If you want more options added for this hook, please open an issue. Thanks!

## Contributing

We welcome contributions! If you find any issues or have suggestions, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
