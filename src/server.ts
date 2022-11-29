import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get<{ numOne: number; numTwo: number; numThree: number }>(
  "/add/:numOne/:numTwo/:numThree?",
  (req, res) => {
    let originalString = `${req.params.numOne} + ${req.params.numTwo}`;
    let resultNum = Number(req.params.numOne) + Number(req.params.numTwo);
    if (req.params.numThree) {
      originalString = `${req.params.numOne} + ${req.params.numTwo} + ${req.params.numThree}`;
      resultNum =
        Number(req.params.numOne) +
        Number(req.params.numTwo) +
        Number(req.params.numThree);
    }
    res.json({
      origional: originalString,
      result: resultNum,
    });
  }
);

app.get<{ words: string }>("/shout/:words", (req, res) => {
  res.json({
    shout: `${req.params.words.toUpperCase()}!`,
    result: `I am shouting back to you: ${req.params.words.toUpperCase()}!`,
  });
});

app.get<{ food: string }>("/eat/:food", (req, res) => {
  const eatContent = req.params.food;

  let divWord = "";
  if (eatContent[0].toLowerCase().match(/[aeiou]/gi)) {
    divWord = "an";
  } else {
    divWord = "a";
  }

  res.json({
    food: eatContent,
    message: `Yum yum - you ate ${divWord} ${eatContent}!`,
  });
});

/*
app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});
app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});
app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});
*/

app.get("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
