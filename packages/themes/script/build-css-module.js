import * as theme from "../dist/index.js";
import fs from "fs";

// 정규 표현식을 사용하여 캐멀케이스를 케밥케이스로 변환
const toCssCasting = (str) => {
  const modifiedStr = str.replace(
    /[A-Z]/g,
    (match) => `-${match.toLowerCase()}`
  );
  return modifiedStr;
};

// variables의 object를 css 변수 형식으로 변환 [...string]
const generateThemeCssVariables = () => {
  const cssStr = [];

  Object.entries(theme.variables).forEach(([key, value]) => {
    cssStr.push(`// ${key}`);

    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          Object.entries(colorValue).forEach(([mainKey, mainValue]) => {
            Object.entries(mainValue).forEach(([subKey, subValue]) => {
              const cssVariable = `--${toCssCasting(mainKey)}-${toCssCasting(
                subKey
              )}: ${subValue};`;
              //   console.log(cssVariable)
              cssStr.push(`${cssVariable}`);
            });
          });
        }
      });
    }
  });

  return cssStr;
};

// css 파일 생성 함수
const generateTheme = () => {
  const variables = generateThemeCssVariables();

  const selector = ":root";
  const cssFormat = `${selector} {\n ${variables.join("\n")} \n}`;

  //   console.log(cssFormat);
  fs.writeFileSync("dist/theme.css", cssFormat);
};

generateTheme();
