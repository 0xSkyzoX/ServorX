import ServerX from ".";
const server = new ServerX(2500);

server.route("/barron", "GET", (req, res) => {
    res.text("Hey", 200).status(200)
})

server.connect(() => console.log(`Server Started on PORT ${server.port}!`))