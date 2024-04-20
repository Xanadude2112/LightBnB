# Tweeter Project

Tweeter is a simple, single-page Twitter clone that uses DOM Manipulation, AJAX, jQuery, JavaScript, HTML5, and CSS.

On this site, you can find a couple of familiar UI and UX features that have been implemented for a slightly improved UX that read as follows;

- For a slightly more pleasing UX, the user may click on the double-down facing arrows under "Write a new tweeter" where they will be immediately directed to the text area to compose a tweet.

- The user may click on the like, retweet, and flagged buttons which will similarly simulate the real life X (Twitter) functions. This is simulated by simply increasing the value by one of the respective button upon each click, as well as the falgged button indicating the user has been flagged.

- Should the user implement hashtags or "@" symbols when tagging someone in their tweeter, once posted, they will have similar behaviours to their respective X (Twitter) counterparts (being coloured blue and darken slightly when you hover over them).

- Lastly, if the tweeter the user composes something that is over the 140 character count, or simply has written nothing at all, they will be met with an appropriate error message that will forbid them to submit the errored tweeter.

## Final Product

!["Screenshot of Tweeter page with first error message"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter-error.png?raw=true)

!["Screenshot of Tweeter page with second error message"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter-error2.png?raw=true)

!["Screenshot of Tweeter page"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter3.png?raw=true)

!["Screenshot of Tweeters"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter2.png?raw=true)

!["Screenshot of Tweeters"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter.png?raw=true)

!["Screenshot of Tweeter tablet / mobile responsiveness"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter-ipad.png?raw=true)

!["Screenshot of Tweeter tablet / mobile responsiveness"](https://github.com/Xanadude2112/tweeter/blob/main/docs/tweeter-ipad2.png?raw=true)


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Body-Parser
- Express
- Chance
- MD5
- Timeago.js
- Node 5.10.x or above

## DevDependencies

- Nodemon
