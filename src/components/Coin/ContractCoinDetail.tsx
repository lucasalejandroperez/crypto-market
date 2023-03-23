import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { CopyToClipboard } from "../CopyToClipboard/CopyToClipboard";
import { consts } from "../../consts/consts";
import { SelectContract } from "../../components/SelectContract/SelectContract";
import { Links, Platforms } from "../../models/coinInterfaces";
import {
  getArrayContracts,
  IContractPlatformType,
  shortenContract,
} from "../../utilities/contractUtils";

const isInvalidContract = (contracts: any): boolean => {
  let isInvalid = false;

  for (const [key, value] of Object.entries(contracts)) {
    if (key.trim() === "" && value === "") {
      isInvalid = true;
      break;
    }
  }

  return isInvalid;
};

interface Props {
  platforms: Platforms;
  links: Links;
  categories: string[];
}

export const ContractCoinDetail = ({ platforms, links, categories }: Props) => {
  return (
    <>
      {!isInvalidContract(platforms) && (
        <Typography component="div">{consts.DETAIL.CONTRACTS}:</Typography>
      )}
      {!isInvalidContract(platforms) &&
        getArrayContracts(platforms)
          .slice(0, 1)
          .map((platform: IContractPlatformType) => (
            <span key={platform.key}>
              <Chip
                sx={{
                  flexDirection: "row-reverse",
                  paddingLeft: 0.5,
                  paddingRight: 2,
                  marginRight: 1,
                }}
                icon={<CopyToClipboard text={`${platform.valor}`} />}
                label={`${platform.key}: ${shortenContract(platform.valor)}`}
              />
            </span>
          ))}
      {!isInvalidContract(platforms) && (
        <SelectContract platforms={platforms} />
      )}

      <Box
        sx={{
          marginTop: 1,
        }}
      >
        {/* SITES */}
        {links && links.homepage && links.homepage.length > 0 && (
          <Typography component="span">{consts.DETAIL.SITE}:</Typography>
        )}
        {links?.homepage.length > 0 && (
          <Chip
            clickable
            avatar={
              <img
                src="../assets/images/weblink.png"
                width="15"
                height="15"
                alt="link"
              />
            }
            label={`${links?.homepage[0]}`}
            component="a"
            href={`${links?.homepage[0]}`}
            sx={{ marginLeft: 1 }}
          />
        )}
      </Box>

      <Box
        sx={{
          marginTop: 1,
        }}
      >
        {/* CATEGORIES */}
        {categories && categories.length > 0 && (
          <Typography component="span" mr={1}>
            {consts.DETAIL.TAGS}:
          </Typography>
        )}
        {categories
          .filter((category) => category && category !== null)
          .map((tag) => (
            <Typography mr={1} component="span" key={tag}>
              <Chip label={`${tag}`} size="small" />
            </Typography>
          ))}
      </Box>
    </>
  );
};
