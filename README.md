
## Some error

- socket can't send any data after mongo updated


## Solved Problem

> Send image file:<br>


- Input
```jsx
<input
    accept="image/*"
    multiple
    type="file"
    alt="image"
    style={{ display: 'none' }}
    id={id}
    onChange={onChange}
/>
```

- Client Handle: `e.target.files` or `e.target.file`

- Send by `axios`. Create `new FormData()` and append all of images with the same `field name` .
- Server Handle: receive by `multer`. The `field name` of `upload.array("field name")` must be alike of client's
- Read file from `path` -> store by `cloudinary` -> get `url` and remove file from `this path` -> send `url` back to client to display
