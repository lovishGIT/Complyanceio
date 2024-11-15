import app from "./app";
import connectDB from "./src/config/db.config";
import env from "./src/config/validateENV.config";

const port: Number = env.PORT || 5000;

connectDB(env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log('Server is running on http://localhost:' + port);
    });
});