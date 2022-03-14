## Wyrm's Crucible

A role-playing game that uses D&D dice rolling system to determine attack accuracy and effectiveness. Control 3 characters with varies abilities to prevail against 5 unique enemies. Enemies have access to varies actions and use an intuitive targeting structure. Every action is recorded in the battle log for users to discern all outcomes.

------------------
### Future Updates

#### Deployment
- Having issues gaining permission to alter PostgreSQL files to work with app. Currently fixing to hopefully deploy with Heroku.

#### Critical Attacks :white_check_mark:
- Adding D&D natural d20(20 sided die) critical modifier.

#### Battle Log :white_check_mark:
- Adjusting battle log to default to the bottom of the log.

#### Floating Numbers :white_check_mark:
- Add floating damage numbers after an attack.
- Add floating healing numbers after restoration.

#### Animations ``In progress...``
- Learning how to effectively use animations as an ally or enemy uses an action.

- Adding animations.

#### Persistence 
- Update backend to retain party Hit Points and Potions.
- Rebalance damage, potion restoration, and potion amount.

#### Tooltips :white_check_mark:
- Implementing tooltips for information on actions for user knowledge.

#### Tutorial/Tips Page
- Creating a page for players to access for detailed guide of all the games rules and systems.

#### Refactoring
- Refactor code where ever possible.
- Dice Rolling
- Implement Redux

### How to Run locally
1. Clone down this repository from GitHub onto your local machine, then cd into root project directory
2. Run two terminals
3. In the first, run:
``` bundle install && rails db:create db:migrate && rails s ```
4. In the secondm run:
``` npm install && npm start --prefix client ```
5. This will install all other dependencies automatically, create the database on your machine, and start the backend and frontend. After the first time running these commands, you only need ``` rails s ``` in the backend terminal and ``` npm start --prefix client ``` in the frontend terminal to start the servers, since you do not need to install dependencies more than once.
6. Open a browser and go to http://localhost:4000 to view the running application.
7. Click "Play", the last button to start.

## Spoiler Alert
The transitioning text is the plot to "The Elder Scrolls V: Skyrim". Do not read if you intend to play Skyrim at any point. (Will eventually have an actual story, just a placeholder.)