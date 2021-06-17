# Plan
# Goal: make a get request to /index.html that send the contents of a local index.html file as a response. Test will pass if the response.text is === to the contents of local /public/index.html file

### Steps
-Create index.html file
-Create an async function that reads and returns the contents of index.html
    -use `fsPromises.readFile`
    -takes in the file name, `readFile(/path/${functionArg})`
-Create a conditional in app.js that checks path and calls async function, creates a response with contents as body and socket.write response
-Catch errors, and write an error response if an error is caught
-Refactor to use callbacks, refactor to use promise chaining.


