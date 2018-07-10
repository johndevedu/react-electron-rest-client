# react-electron-rest-client (RERC)

### A Fast, Intuitive Cross Platform REST Client using React and Electron
REST clients are one of developer's main tools. Although there are great clients out there, I feel there are enough pain points where an alternative, such as RERC can fill the void. 

For the initial version, it is based on the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) as the starting point.

## Main Objectives

#### Simple
There are simple REST clients out there, but some parts of the simple interface are not intuitive.

#### Fast to load
On the other hand, while other REST clients have nice interfaces, they take forever to load.

#### Easy to contribute
I think the first two objectives are attainable, but it would take me a long time to achieve. Therefore, I want to keep the codebase easy to contribute to. Hopefully, we can achieve this third goal w/o sacrificing too much in terms of maintainability, scalability, and other best practices.


## Immediate Future
#### Proof of Concept
Right now, I'm focused on getting a simple version in a intuitive UI with minimal features i.e. 
- HTTP Method
- URL
- Response
- Request Body

#### Initial Version
- Make an executable app on Windows and Mac and make sure the performance (mainly load time) is acceptable.
- If performance is unacceptable, ponder alternatives such as starting with incorporating React + Electron from scratch instead of using the Bootstrapped (aka boilerplate) version. 

#### Come up with Roadmap for v1
Possibly add things like:
- ability to save requests
  - into collections
- history
  - collapse/expand all history into dates
  - for performance:
    - load last 10 history items with infinite scroll
    - don't load the history panel until other UI elements are already drawn
- JSON body formatting (something I care about...)