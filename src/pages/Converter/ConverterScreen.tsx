import { Container } from "@mui/material";
import { Converter } from "../../components/Converter/Converter";

export const ConverterScreen = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        border: "1px solid grey",
        marginTop: 2,
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Converter />
    </Container>
  );
};
