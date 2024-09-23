import React, { useState } from "react";
import {
  Page,
  Text,
  Image,
  Document,
  PDFViewer,
  View,
} from "@react-pdf/renderer";
import Logo from "../../img/logo.jpg";
import Sign from "../../img/podpis.jpg";
import Shtamp from "../../img/shtamp.jpg";
import { Font } from "@react-pdf/renderer";
import MyCustomFont from "../../fonts/calibri.ttf";
import MyCustomFontBold from "../../fonts/calibriBold.ttf";
import MyCustomFontItalic from "../../fonts/calibriItalic.ttf";
import MyCustomFontBoldItalic from "../../fonts/calibriBoldItalic.ttf";
//import { useSelector } from "react-redux";
import styles from "./PDFstyles";

Font.register({
  family: "Calibri",
  src: MyCustomFont,
});
Font.register({
  family: "CalibriBold",
  src: MyCustomFontBold,
});
Font.register({
  family: "CalibriItalic",
  src: MyCustomFontItalic,
});
Font.register({
  family: "CalibriBoldItalic",
  src: MyCustomFontBoldItalic,
});

const PDFFile = ({
  value = {},
  title = "Коммерческое предложение.",
  place = "г. Астана, улитца Кенесеры, дом 2, государственная филармония",
  date = "10.01.2022",
  titleTable = "Backline",
  miniDescription = "Барабанная установка, микрофоны вокальные, микрофоны для подзвучки барабанов, стойки микрофонные, коммутация для подключения инструментов.",
  discount = 20,
  services = {},
  dateSign = "01.01.2022",
}) => {
  const items = Object.values(value);
  const countItems = items.length;
  const equipPrice = items.reduce(
    (acc, item) => acc + item.Стоимость * item.count,
    0
  );
  services = Object.values(services);
  const servicesCount = services.length;
  const servicesPrice = services.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const Footer = ({ pageNumber }) => (
    <View style={styles.footer}>
      <Text>Page 1</Text>
    </View>
  );

  return (
    //закоментировать вьювер когда макет готов будет
    <PDFViewer style={styles.viewer}>
      <Document>
        {/*render a single page*/}
        <Page
          size="A4"
          style={styles.page}
          renderFooter={(pageNumber) => <Footer pageNumber={pageNumber} />}
        >
          <View style={styles.header}>
            <Image style={styles.logoImage} src={Logo} />
            <Text style={styles.headetText}>{title}</Text>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.headetTitleText}>Аренда оборудования</Text>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.headerContentDate}>
              Дата проведения мероприятия: {date}
            </Text>
            <Text style={styles.headerContentAddres}>
              Место проведения мероприятия: {place}
            </Text>
          </View>
          {/*Таблица*/}
          <View style={styles.table}>
            <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
              <View style={styles.headerTableColId}>
                <Text style={styles.headerTableCell}>№ п/ п</Text>
              </View>
              <View style={styles.headerTableColImg}>
                <Text style={styles.headerTableCell}>Фото</Text>
              </View>
              <View style={styles.headerTableColName}>
                <Text style={styles.headerTableCell}>
                  Наименование услуги (работы)
                </Text>
              </View>
              <View style={styles.headerTableColDescription}>
                <Text style={styles.headerTableCell}>Краткое описание</Text>
              </View>
              <View style={styles.headerTableColCount}>
                <Text style={styles.headerTableCell}>Кол -во</Text>
              </View>
              <View style={styles.headerTableColPrice}>
                <Text style={styles.headerTableCell}>Цена за шт.</Text>
              </View>
              <View style={styles.headerTableColAllPrice}>
                <Text style={styles.headerTableCell}>Цена</Text>
              </View>
            </View>
            <View style={styles.headerTableRow}>
              <Text style={styles.TableColTitle}>{titleTable}</Text>
            </View>
            <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
              <Text style={styles.TableColMiniDescription}>
                Краткое описание: {miniDescription}
              </Text>
            </View>
            {/*Тело таблицы*/}
            {items.map(function (item, index) {
              console.log(item, index);
              return (
                <View
                  style={
                    (index + 1) % 2 === 0
                      ? [styles.bodyTableRow, styles.TableRowColorGrey]
                      : [styles.bodyTableRow]
                  }
                  key={index}
                  wrap={false}
                >
                  <View style={styles.bodyTableColId}>
                    <Text style={styles.bodyTableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.bodyTableColImg}>
                    <Image src={item["Изображения"]} />
                  </View>
                  <View style={styles.bodyTableColName}>
                    <Text style={styles.bodyTableCell}>
                      {item["Наименование"]}
                    </Text>
                  </View>
                  <View style={styles.bodyTableColDescription}>
                    <Text style={styles.bodyTableCell}>{item["Описание"]}</Text>
                  </View>
                  <View style={styles.bodyTableColCount}>
                    <Text style={styles.bodyTableCell}>{item.count}</Text>
                  </View>
                  <View style={styles.bodyTableColPrice}>
                    <Text style={styles.bodyTableCell}>
                      {item["Стоимость"]}
                    </Text>
                  </View>
                  <View style={styles.bodyTableColAllPrice}>
                    <Text style={styles.bodyTableCell}>
                      {+item["Стоимость"] * item.count}
                    </Text>
                  </View>
                </View>
              );
            })}
            {/*Итого за оборудование*/}
            <View
              style={
                (countItems + 1) % 2 === 0
                  ? [styles.bodyTableRow, styles.TableRowColorGrey]
                  : [styles.bodyTableRow]
              }
              wrap={false}
            >
              <View style={styles.bodyTableColId}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={[styles.bodyTableColName, styles.BoldText]}>
                <Text style={styles.bodyTableCell}>Итоги промежуточные</Text>
              </View>
              <View style={[styles.bodyTableColDescription, styles.TextCenter]}>
                <Text style={styles.bodyTableCell}>Итого за {titleTable}</Text>
              </View>
              <View style={styles.bodyTableColCount}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={styles.bodyTableColPrice}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={styles.bodyTableColAllPrice}>
                <Text style={styles.bodyTableCell}>{equipPrice}</Text>
              </View>
            </View>
            {/*Скидка*/}
            <View
              style={
                (countItems + 2) % 2 === 0
                  ? [styles.bodyTableRow, styles.TableRowColorGrey]
                  : [styles.bodyTableRow]
              }
              wrap={false}
            >
              <View style={styles.bodyTableColId}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={[styles.bodyTableColName, styles.BoldText]}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={[styles.bodyTableColDescription, styles.TextCenter]}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={styles.bodyTableColCount}>
                <Text style={styles.bodyTableCell}></Text>
              </View>
              <View style={[styles.bodyTableColPrice, styles.BoldText]}>
                <Text style={styles.bodyTableCell}>СКИДКА {discount}%</Text>
              </View>
              <View
                style={[styles.bodyTableColAllPrice, styles.ItalicBoldText]}
              >
                <Text style={styles.bodyTableCell}>
                  {equipPrice - equipPrice * (+discount / 100)}
                </Text>
              </View>
            </View>
            {/*Всякие услуги*/}
            {services && services.length > 0 ? (
              <>
                <View
                  style={
                    (countItems + 3) % 2 === 0
                      ? [styles.headerTableRow, styles.TableRowColorGrey]
                      : [styles.headerTableRow]
                  }
                  wrap={false}
                >
                  <Text style={styles.TableColTitle}>Услуги специалистов</Text>
                </View>
                {services.map((item, index) => (
                  <View
                    style={
                      (countItems + index) % 2 === 0
                        ? [styles.bodyTableRow, styles.TableRowColorGrey]
                        : [styles.bodyTableRow]
                    }
                    wrap={false}
                    key={index}
                  >
                    <View style={styles.bodyTableColId}>
                      <Text style={styles.bodyTableCell}>
                        {countItems + index + 1}
                      </Text>
                    </View>
                    <View style={styles.bodyTableColName}>
                      <Text style={styles.bodyTableCell}>{item.title}</Text>
                    </View>
                    <View style={styles.bodyTableColDescription}>
                      <Text style={styles.bodyTableCell}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.bodyTableColCount}>
                      <Text style={styles.bodyTableCell}>{item.count}</Text>
                    </View>
                    <View style={styles.bodyTableColPrice}>
                      <Text style={styles.bodyTableCell}>{item.price}</Text>
                    </View>
                    <View style={styles.bodyTableColAllPrice}>
                      <Text style={styles.bodyTableCell}>
                        {item.count * item.price}
                      </Text>
                    </View>
                  </View>
                ))}
                {/*Итого за услуги*/}
                <View
                  style={
                    (countItems + servicesCount) % 2 === 0
                      ? [styles.bodyTableRow, styles.TableRowColorGrey]
                      : [styles.bodyTableRow]
                  }
                  wrap={false}
                >
                  <View style={styles.bodyTableColId}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={[styles.bodyTableColName, styles.BoldText]}>
                    <Text style={styles.bodyTableCell}>
                      Итоги промежуточные
                    </Text>
                  </View>
                  <View
                    style={[styles.bodyTableColDescription, styles.TextCenter]}
                  >
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColCount}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColPrice}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColAllPrice}>
                    <Text style={styles.bodyTableCell}>{servicesPrice}</Text>
                  </View>
                </View>
                {/*Итого за все*/}
                <View
                  style={
                    (countItems + servicesCount + 1) % 2 === 0
                      ? [styles.bodyTableRow, styles.TableRowColorGrey]
                      : [styles.bodyTableRow]
                  }
                  wrap={false}
                >
                  <View style={styles.bodyTableColId}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View
                    style={[
                      styles.bodyTableColName,
                      styles.BoldText,
                      styles.TextRight,
                    ]}
                  >
                    <Text style={styles.bodyTableCell}>Итого</Text>
                  </View>
                  <View
                    style={[styles.bodyTableColDescription, styles.TextCenter]}
                  >
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColCount}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColPrice}>
                    <Text style={styles.bodyTableCell}></Text>
                  </View>
                  <View style={styles.bodyTableColAllPrice}>
                    <Text style={styles.bodyTableCell}>
                      {servicesPrice +
                        (equipPrice - equipPrice * (+discount / 100))}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
          {/*Подпись и штамп*/}
          <View style={styles.FinishBlock}>
            <View style={styles.FinishBlockLeft}>
              <View style={styles.FinishBlockLeftContent}>
                <Text
                  style={[
                    styles.FinishBlockLeftContentText,
                    styles.BorderBottomBlackSmall,
                  ]}
                >
                  Директор Ткаченко А. Н.
                </Text>
              </View>
              <View style={styles.FinishBlockLeftContent}>
                <Text style={styles.FinishBlockLeftContentText}>
                  (Должность) Ф.И,О.
                </Text>
              </View>

              <View style={styles.FinishBlockLeftContent}>
                <Text
                  style={[
                    styles.FinishBlockLeftContentText,
                    styles.BorderBottomBlackSmall,
                  ]}
                >
                  {dateSign}
                </Text>
              </View>
              <View style={styles.FinishBlockLeftContent}>
                <Text style={styles.FinishBlockLeftContentText}>(Дата)</Text>
              </View>
              <View style={styles.FinishBlockLeftContent}>
                <View style={styles.FinishBlockLeftContentSign}>
                  <Text>Подпись</Text>
                  <View style={styles.FinishBlockLeftContentSignImg}>
                    <Image src={Sign} style={styles.SignImage} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.FinishBlockRight}>
              <View style={styles.FinishBlockRightContent}>
                <View style={styles.FinishBlockRightContentText}>
                  <Text>М.П.</Text>
                </View>
                <View style={styles.FinishBlockRightContentImg}>
                  <Image src={Shtamp} style={styles.ShtampImage} />
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFFile;
