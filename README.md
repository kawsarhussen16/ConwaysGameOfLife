# ConwaysGameOfLife

![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)
[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

#### Visualizing the “Game of Life”
The main entry point of your application should house the visualization of this cellular automata. Include necessary components, such as:
- [ ] Grid to display cells. 
- [ ] Cell objects or components that, at a minimum, should have:
    * Properties
        - [ ] currentState: (alive, dead), (black, white)
        - [ ] isClickable:
          - can be clicked to allow user to setup initial cell configuration 
          - should NOT be clickable while simulation is running
    * Behaviors
        - [ ] toggle_state( ): switch between alive & dead either because user manually toggled cell before starting simulation or simulation is running and rules of life caused cell to change state
- [ ] An appropriate data structure to hold a grid of cells. 
- [ ] Text to display current generation # being displayed
    * Utilize a timeout function to build the next generation of cells & update the display at the chosen time interval     
- [ ] Button(s) that start & stop the animation
- [ ] Button to clear the grid