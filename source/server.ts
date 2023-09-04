import ServerX from ".";
const server = new ServerX(2500);

server.route("/barron", "POST", (req, res) => {
    const {name} = req.body;
    console.log(name)
})

server.connect(() => console.log(`Server Started on PORT ${server.port}!`))