React Scatterplot
===================


This is an app to show off making a scatterplot within a React component.  To do this, [CanvasJS](https://canvasjs.com/) was used as a highly performant library to draw on the HTML5 Canvas.

----------

## Starting the app :seedling: 

Once you have cloned the repository, first fire up the server by typing in `node server.js`

Then in a separate tab of the terminal, run `npm start`
The app's client side (that serves up the index.html) will depend on the data from the server.js, so it is important to have them running concurrently.


Features of the app :balloon: 
-------------

1. The X axis represents a timeline, the Y axis represents a duration in seconds
2. The data is supplied through a simple server json rendering, and data can be restricted to show just "passing" or "failing" cases through the routing supplied on the Express server.
3. Every dot supplied by the MOCK_DATA.js file (or any REST API that would be referenced) plots onto the graph
4. Each plotpoint has a status corresponding to its color
5. Component adapts to the container and scales its axes depending on the data given.  This is done through the CanvasJS API.
6. You can restrict the range you are looking at by dragging the mouse over an area of interest -- this is also another internal feature of the CanvasJS API which additionally allows you to scroll through the graph once you have 

> **Note:**
> The app is intended to be able to select a data point and give it an "active" look (this being done through a black border).  I'm not sure if this is compatible with the CanvasJS library, and when you click on it within the rendered component, it only activates on hover.  I tried demonstrating that this should be kept track of, and in the developer's console, clicking on each icon will indicate which state it should have, but the rendering isn't matching up right now. 

#### Restricting data points

The app can be restricted to show just passes / fails / errors.  This is in supplement to being able to restrict by data range (which can be accomplished just through the CanvasJS library).  So I tried adding an additional layer to demonstrate how this could work.  So each button makes a distinct request to the server, which restricts just the data it wants (like just failing dots) to the client to render out on the HTML5 canvas.

The routing on the server.js file is meant to be able to accomodate flexibility, so whatever parameter you pass to it will be a restricting factor (right now just checking statuses, but could be changed for whatever you want to filter).