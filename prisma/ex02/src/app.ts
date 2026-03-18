import express from "express";
import { router as userRoutes } from "./routes/UserRoutes";
import { router as postRoutes } from "./routes/PostRoutes";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
