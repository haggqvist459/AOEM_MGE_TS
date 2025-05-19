# Updated list app from prior redux tutorial
## Using TypeScript, Vite and Redux

### Features: 

#### Home Page: 
- [x] Horizontal naviation between daily calculators 
- [x] Displays the daily calculators

#### Admin Page: 
- [x] Import & Export functions 
- [x] Delete function for localStorage

#### Total Score Page: 
- [x] Display overview of total score
- [x] Display overview of each daily score
- [x] Compare with previous events
- [x] Average the previous events for comparison

#### Previous Event Score Page: 
- [x] Set up previous events
- [x] Allow for first to tenth or first and tenth place scores
- [x] Average score calculation using a selector
- [x] Select specific previous event for score calculation
 
#### About Page: 
- [x] Explain how data is gathered and kept 
- [x] Disclaimers 

#### Error Page: 
- [x] Custom error page with theme styling
- [x] Link to home page

#### Nav Bar: 
- [x] Custom button with transitions 
  -  [x] Toggles hidden horizontal menu
- [x] Link to home page on header title 

#### Daily Calculators: 
- [x] Navigation buttons between the previous and next days 
- [x] Common hook for local and redux state updates
- [x] Modal pop up with confirmation prior to state reset
- [x] Fetch previous event averages for the output section

#### Misc:
- [x] Persist list using localStorage
- [x] PWA for offline support
- [x] Custom font locally available 
- [x] Local SVG code for icons in separate components
- [x] Theme variables for colours
- [x] Custom icon & splash screen
- [x] Re-name Header to NavBar
- [x] Re-name SubHeader to Header
- [x] Create SubHeader component for the h3 element with 17px font size
- [x] Fix Nav menu width on certain breakpoints (md?)
- [x] Remove decimal points for gathering score on day three
- [x] Apply city and imperial titles for troop training 
- [x] Apply state types on reset object in reset state reducer 
- [x] Fix duplicate form IDs on day five (likely troop types)
- [x] Add same fade in effect on all pages
- [x] Rename CalculatorContainer and -Header to Section-
- [x] Add sliding effects to calculators 
- [ ] Re-work Day 5 to similar style as Day 3
- [ ] Update day three gathering title, set it to 'Gathering Troops' or similar