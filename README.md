# Spanish Flash

## Application details

- Spanish Flash is an spaced repetition learning application to learn the Spanish language.
- Create an account to keep track of your progress.
- User will be prompted with a word to translate into English.
- A text input field is given to the user to be able to input their answer.
- If the answer is correct than the user will be displayed a "correct" response.
- If the answer is incorrect than the user will be given the correct answer as a response.
- As the learning process and the application progresses along, the questions will be displayed in an order that
  conforms to the space repetition learning, where correctly answered questions will not be displayed as often as the incorrectly answered questions.

## Where to find

You can visit [https://forgiv.github.io/spacedRepetition-client/](https://forgiv.github.io/spacedRepetition-client/)!

## Instructions

- Clone this repository to local directory.
- Do an 'npm install' to install the dependencies needed to run this server.
- Create a Mongo database and have a URL to connect to.
- Create a '.env' file in your local directory and create a 'JWT_SECRET' variable withe your secret word, and a      'DATABASE_URL' varible to put your database URL location in.

## Coding styles

- Node.js was used in conjuction with Express.js to implement the server side code.
- Mongo and Mongoose was used for the database structuring and access.
- React was used for the components to display the various forms of information.
- React-Redux was used for the management of the state.


## Contributions

Contributions to the application are accepted. If you have a design suggestion, feel free to
change and make a pull request.

## Built With

- [React](https://github.com/gitname/react-gh-pages) - The web framework used
- [Redux: Usage with React](https://redux.js.org/basics/usage-with-react) - State management
- [JWT-decode](https://www.npmjs.com/package/jwt-decode) - Verification
- [Mongo](https://www.mongodb.com) - The database used to store information
- [Mongoose](http://mongoosejs.com/docs/guide.html) - Framework used to access DB
- [Node.js](https://nodejs.org/en) - Runtime enviorment for package management
- [Express.js](https://expressjs.com) - Framework used for the application
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For security of user accounts
- [Mocha](https://mochajs.org/) - Framework used for testing the server code
- [Chai.js](http://www.chaijs.com) - Assertion library used for the testing

## Author

- **Dameon Mendoza** - *Initial work* - [dameon1](https://github.com/dameon1)

## Contributors

- **Hiram Cruz** - *Initial work* - [forgiv](https://github.com/forgiv)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

[Thinkful](https://www.thinkful.com/)
