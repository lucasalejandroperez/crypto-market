export interface IContractPlatformType {
    key: string;
    valor: unknown;
}

// TODO: Move to another place, in the same component of contracts maybe?
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