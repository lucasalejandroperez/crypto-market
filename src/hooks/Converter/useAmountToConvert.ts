import { ChangeEvent, useState } from "react";

export const useAmountToConvert = (defaultValue:string) => {
    const [amountToConvert, setAmountToConvert] = useState<string>(defaultValue);

    const handleOnChangeAmountToConvert = (
        event: ChangeEvent<HTMLInputElement>
      ) => {
        setAmountToConvert(event.target.value);
      };

    return { amountToConvert, setAmountToConvert, handleOnChangeAmountToConvert}
}