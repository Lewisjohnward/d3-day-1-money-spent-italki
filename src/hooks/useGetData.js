import { csv } from "d3";
import React, { useState, useEffect } from "react";

const moneyUrl =
  "https://gist.githubusercontent.com/Lewisjohnward/b14281850d206f89a1888e220af0f4ba/raw/52619669d419d622fbf6605bcce81ba4e5225e14/buyCredits.csv";
const lessonsUrl =
  "https://gist.githubusercontent.com/Lewisjohnward/dc9168ccdbf91221f33e4518e3cb2545/raw/bb0725b58e2cb14db05b975a80e706191a024e00/lessons-detailed.csv";

export const useGetData = (type = "money") => {
  //money, lessons, packages
  const [data, setData] = useState(null);

  const urlObject = [
    {
      url: moneyUrl,
      row: (d) => {
        d.price = +d.price / 1.3;
        d.date = new Date(+d.date);

        return d;
      },
    },
    {
        url: lessonsUrl,
        row: (d) => {
          d.language = d.language;
          d.date = new Date(d.date);
          d.teacherName = d.teacherName;
          //length
  
          return d;
        },
      },
  ];

  const url =
    type === "lessons" ? urlObject[1] : type === "money" ? urlObject[0] : null;

  

  useEffect(() => {
    csv(url.url, url.row).then(setData);
  }, []);

  return data;
};
