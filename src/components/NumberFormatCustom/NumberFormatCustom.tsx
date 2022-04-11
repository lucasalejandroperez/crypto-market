import { forwardRef } from "react";
import NumberFormat from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

  // TODO: Move to utils or components (with the interface)
export const NumberFormatCustom = forwardRef<NumberFormat<number>, CustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          isNumericString
        />
      );
    },
);