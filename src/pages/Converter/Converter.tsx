import { Container } from "@mui/material";
import { ConverterBox } from "../../components/Converter/ConverterBox";

export const Converter = () => {
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
      <ConverterBox />
    </Container>
  );
};
