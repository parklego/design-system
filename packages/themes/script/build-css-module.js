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
  const cssLightStr = [];
  const cssDarkStr = [];

  Object.entries(theme.variables).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          Object.entries(colorValue).forEach(([mainKey, mainValue]) => {
            Object.entries(mainValue).forEach(([subKey, subValue]) => {
              const cssVariable = `--${toCssCasting(mainKey)}-${toCssCasting(
                subKey
              )}: ${subValue};`;
              //   console.log(cssVariable)
              cssLightStr.push(`${cssVariable}`);
            });
          });
        }
        if (colorKey === "dark") {
          Object.entries(colorValue).forEach(([mainKey, mainValue]) => {
            Object.entries(mainValue).forEach(([subKey, subValue]) => {
              const cssVariable = `--${toCssCasting(mainKey)}-${toCssCasting(
                subKey
              )}: ${subValue};`;
              //   console.log(cssVariable)
              cssDarkStr.push(`${cssVariable}`);
            });
          });
        }
      });
    }
  });

  return [cssLightStr, cssDarkStr];
};

// css 파일 생성 함수
const generateTheme = () => {
  const [cssLightStr, cssDarkStr] = generateThemeCssVariables();

  const lightFormat = `:root {\n${cssLightStr.join("\n")} \n}`;
  const darkFormat = `:root .theme-dark {\n${cssDarkStr.join("\n")} \n}`;

  fs.writeFileSync("dist/theme.css", `${lightFormat} \n\n${darkFormat}`);
};

generateTheme();
