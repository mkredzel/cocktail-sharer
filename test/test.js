const PORT = process.env.PORT || 8080;
let cocktailArray = [];
let userArray = [
  { username: "Adam12", password: "psw1" },
  { username: "John33", password: "xssd" },
  { username: "marcel321", password: "mypswd" }
];

let chai = require("chai");

let expect = chai.expect;

//Mocha tests for port
describe("#testPORT == 8080", () => {
  it("Should return the port", done => {
    let result = PORT;
    expect(result).to.equal(8080);

    done();
  });
});

//Mocha tests for port
describe("#testPORT != 3000", () => {
  it("Should return the port", done => {
    let result = PORT;
    expect(result).to.not.equal(3000);

    done();
  });
});

//Mocha tests for cocktailArray
describe("cocktailArray is an array", () => {
  it("Should return the array", done => {
    let result = cocktailArray;
    expect(result).to.be.an("array");

    done();
  });
});

//Mocha tests for userArray
describe("userArray length > 2", () => {
  it("Should return the array", done => {
    let result = userArray;
    expect(result).to.have.lengthOf.above(2);

    done();
  });
});

//Mocha tests for userArray
describe("userArray includes member", () => {
  it("Should return the array", done => {
    let result = userArray;
    expect(result[1]).to.include({ username: "John33" });

    done();
  });
});
