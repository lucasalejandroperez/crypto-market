export interface IContractPlatformType {
    key: string;
    valor: unknown;
}

export const getArrayContracts = ( contracts:any ): IContractPlatformType[] => {
    let contractList:IContractPlatformType[] = [];

    for (const [key, value] of Object.entries(contracts)) {
      
      const newContract: IContractPlatformType = {
        key,
        valor: value
      };

      if (newContract.key.trim() !== '' && newContract.valor !== '') {
        contractList.push(newContract);
      }

    }

    return contractList;
  }

export const shortenContract = ( value:any ):string => {

  const contract:string = value;

  let shortContract = '';

  if (contract.trim().length > 13) {
    shortContract = contract.trim().slice(0, 6);
    shortContract = shortContract + '...';
    shortContract = shortContract + contract.trim().slice(-7);
  }
  
  return shortContract;
}

export const getPercentageCirculatingSupply = ( circulatingSupply:number, maxSupply:number):number => {
    return Math.ceil((( circulatingSupply * 100 ) / maxSupply));
}