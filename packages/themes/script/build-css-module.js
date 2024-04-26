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
  const cssOtherStr = [];

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
    } else {
      Object.entries(value).forEach(([mainKey, mainValue]) => {
        Object.entries(mainValue).forEach(([subKey, subValue]) => {
          const cssVariable = `--${toCssCasting(mainKey)}-${toCssCasting(
            subKey
          )}: ${subValue};`;
          //   console.log(cssVariable)
          cssOtherStr.push(`${cssVariable}`);
        });
      });
    }
  });

  return [cssLightStr, cssDarkStr, cssOtherStr];
};

const generateThemeCssClasses = () => {
  const cssClasses = [];
  Object.entries(theme.classes).forEach(([, mainValue]) => {
    Object.entries(mainValue).forEach(([subKey, subValue]) => {
      Object.entries(subValue).forEach(([key, value]) => {
        const className = `${subKey}${key}`;

        const styleString = Object.entries(value)
          .map(([prop, val]) => `${toCssCasting(prop)}: ${val};\n`)
          .join(" ");

        const classWithStyle = `.${className} {\n ${styleString} }\n`;

        cssClasses.push(classWithStyle);
      });
    });
  });

  return cssClasses;
};

// css 파일 생성 함수
const generateTheme = () => {
  const [cssLightStr, cssDarkStr, cssOtherStr] = generateThemeCssVariables();
  const cssClasses = generateThemeCssClasses();

  const lightFormat = `:root {\n${cssLightStr.join("\n")} \n}`;
  const darkFormat = `:root .theme-dark {\n${cssDarkStr.join("\n")} \n}`;
  const otherFormat = `:root {\n${cssOtherStr.join("\n")} \n}`;
  const classFormat = `${cssClasses.join("\n")} \n`;

  fs.writeFileSync(
    "dist/theme.css",
    `${lightFormat} \n\n${darkFormat} \n\n${otherFormat} \n\n${classFormat}`
  );
};

generateTheme();
