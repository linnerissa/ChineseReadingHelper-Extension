# Chrome Extension: XinHuaNet Reading Helper

When learning to read chinese, having natural language segmentation can help a reader better understand the language phrasing. This extension overwrites the main article body of some XinHuaNet Article to provide the segmentation, pronunciation, and translation of these phrases on demand. This can help a reader more easily get a feel for the language choices and building blocks used in written language. 

This was mostly meant to be a learning exploration into:
* Chrome extensions and how they work/are set up (I found this youtube video useful: https://www.youtube.com/watch?v=Ipa58NVGs_c)
* How to inject react into a webpage through a chrome extension (This tutorial was extremely helpful: https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39) 

The injected elements were mostly explored in the sister repo: https://github.com/linnerissa/ChineseReadingHelper where I tried to learn how to setup an express server and react webpage.

## TO DO: 
Here's a list of things I could do as improvement (but I might not; depends on if theres much more interest in learning this here)
* Cleanup the unused files and better name related things. It's not immediately evident why Content.JS actually has most of the code for the inject react for example and that the app.js is responsible for the actual extension. 
* Move all the local server fetches over to the deployed app. This means the extension can actually be standalone without having to locally run the server.
* Figure out how to make the extension popup persist since it seems to lose state
* Rework whether the toggle is meant to be for all the pages or per page (in which case it should be a button). The actual content.js code probably supports button a little better.
* Visually - everything looks kind of awful...
