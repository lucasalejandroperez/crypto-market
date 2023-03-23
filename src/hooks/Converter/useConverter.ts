import { isEmpty } from "../../utilities/jsValidations";
import { useCoinSearch } from "./useCoinSearch";

export const useConverter = () => {
    const handleOnClickInvertCoins = () => {
        const leftCoin = Object.create(selectedLeftCoin);
        const rightCoin = Object.create(selectedRightCoin);

        if (leftCoin && !isEmpty(leftCoin)) {
        handleOnClickRightCoin(leftCoin);
        }

        if (rightCoin && !isEmpty(rightCoin)) {
        handleOnClickLeftCoin(rightCoin);
        }
    };

    const leftSearch = useCoinSearch();
    const rightSearch = useCoinSearch();

    const {selectedCoin: selectedLeftCoin} = leftSearch;
    const {searchItems: searchItemsLeft} = leftSearch;
    const {showSearch: showLeftSearch} = leftSearch;
    const {selectedCurrentPrice: selectedLeftCurrentPrice} = leftSearch;
    const {coinDescription: leftCoinDescription} = leftSearch;
    const {handleOnChange: handleOnChangeLeftCoin} = leftSearch;
    const {handleOnClick: handleOnClickLeftCoin} = leftSearch;
    const {handleOnBlur: handleOnBlurLeftCoin} = leftSearch;

    const {selectedCoin: selectedRightCoin} = rightSearch;
    const {searchItems: searchItemsRight} = rightSearch;
    const {showSearch: showRightSearch} = rightSearch;
    const {selectedCurrentPrice: selectedRightCurrentPrice} = rightSearch;
    const {coinDescription: rightCoinDescription} = rightSearch;
    const {handleOnChange: handleOnChangeRightCoin} = rightSearch;
    const {handleOnClick: handleOnClickRightCoin} = rightSearch;
    const {handleOnBlur: handleOnBlurRightCoin} = rightSearch;

    return {
        selectedLeftCoin,
        selectedRightCoin,
        showLeftSearch,
        showRightSearch,
        selectedLeftCurrentPrice,
        selectedRightCurrentPrice,
        leftCoinDescription,
        rightCoinDescription,
        searchItemsLeft,
        searchItemsRight,
        handleOnChangeLeftCoin,
        handleOnClickLeftCoin,
        handleOnBlurLeftCoin,
        handleOnChangeRightCoin,
        handleOnBlurRightCoin,
        handleOnClickRightCoin,
        handleOnClickInvertCoins
    }
}