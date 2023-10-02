import fetch from "node-fetch";
import fs from "fs";

async function fetchFun() {
  const request = "Кроссовки мужские";
  const enCodedreq = encodeURI(request);
  console.log(fetch);
  let data = await fetch(
    "https://catalog.wb.ru/brands/h/catalog?appType=1&brand=19985&curr=rub&dest=12358457&page=23&regions=80,115,38,4,64,83,33,68,70,69,30,86,40,1,66,110,22,31,48,114&sort=popular&spp=20"
  );
  const result = await data.json();

  fs.writeFile("filename.json", JSON.stringify(result), "utf8", console.log);
  console.log(result);
}
fetchFun();
