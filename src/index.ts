require("dotenv").config();
const PORT = process.env.PORT || 3000;
import App from "./app/main";
const register = new App();
const app = register.init();


app.listen(PORT, async () => {

  console.log(`app is listening on ${PORT}`);
});
