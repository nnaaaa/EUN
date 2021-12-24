# Summary


> Exception Handling

We use `try` `catch` to handle error and `throw` to notify the detected error
```cpp
try{
    /* if error appear and is thrown, 
    all of variable in this block will be terminate */

    /* The point wouldn't be destroy because it's essence,
    so we should be careful when use pointer in try catch block*/
    throw new Error
}
catch{
    
}
```

Try catch is usually used with asynchronous program 

> Smart Pointer (aka conventional pointer)

- A class help us to `allocate` and `deallocate` `automatically` that overloaded operators and destructors to ensure that dynamically
allocated data is destroyed in a timely manner. <br>
- In many certain circumstances, we can't control the memory of the pointer. So C++ create smart pointers.