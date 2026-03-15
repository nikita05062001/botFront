import React from "react";
import { Page, Text, Image, Document, View } from "@react-pdf/renderer";
import Logo from "../../img/logo.jpg";
import Sign from "../../img/podpis.jpg";
import Shtamp from "../../img/shtamp.jpg";
import { Font } from "@react-pdf/renderer";
import MyCustomFont from "../../fonts/calibri.ttf";
import MyCustomFontBold from "../../fonts/calibriBold.ttf";
import MyCustomFontItalic from "../../fonts/calibriItalic.ttf";
import MyCustomFontBoldItalic from "../../fonts/calibriBoldItalic.ttf";
import styles from "./PDFstyles";

Font.register({ family: "Calibri", src: MyCustomFont });
Font.register({ family: "CalibriBold", src: MyCustomFontBold });
Font.register({ family: "CalibriItalic", src: MyCustomFontItalic });
Font.register({ family: "CalibriBoldItalic", src: MyCustomFontBoldItalic });

const PDFFile = ({
  value = [], // Получаем уже массив с Base64
  title = "Коммерческое предложение.",
  place = "",
  date = "",
  titleTable = "",
  miniDescription = "",
  discount = 0,
  services = {},
  dateSign = "",
  conditions = [],
}) => {
  const items = Array.isArray(value) ? value : Object.values(value);
  const countItems = items.length;

  const equipPrice = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.count) || 0),
    0,
  );

  const servicesList = Object.values(services);
  const servicesCount = servicesList.length;
  const servicesPrice = servicesList.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.count) || 0),
    0,
  );

  const Footer = () => (
    <View style={styles.footer}>
      <Text>Страница 1</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>{title}</Text>
        </View>

        <View style={styles.headerTitle}>
          <Text style={styles.headetTitleText}>Аренда оборудования</Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.headerContentDate}>Дата проведения: {date}</Text>
          <Text style={styles.headerContentAddres}>
            Место проведения: {place}
          </Text>
        </View>

        <View style={styles.table}>
          {/* Заголовок таблицы */}
          <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
            <View style={styles.headerTableColId}>
              <Text style={styles.headerTableCell}>№</Text>
            </View>
            <View style={styles.headerTableColImage}>
              <Text style={styles.headerTableCell}>Фото</Text>
            </View>
            <View style={styles.headerTableColName}>
              <Text style={styles.headerTableCell}>Наименование</Text>
            </View>
            <View style={styles.headerTableColDescription}>
              <Text style={styles.headerTableCell}>Описание</Text>
            </View>
            <View style={styles.headerTableColCount}>
              <Text style={styles.headerTableCell}>Кол-во</Text>
            </View>
            <View style={styles.headerTableColPrice}>
              <Text style={styles.headerTableCell}>Цена/шт</Text>
            </View>
            <View style={styles.headerTableColAllPrice}>
              <Text style={styles.headerTableCell}>Сумма</Text>
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

          {/* Тело таблицы */}
          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.bodyTableRow,
                (index + 1) % 2 === 0 ? styles.TableRowColorGrey : {},
              ]}
              wrap={false}
            >
              <View style={styles.bodyTableColId}>
                <Text style={styles.bodyTableCell}>{index + 1}</Text>
              </View>

              <View style={styles.bodyTableColImage}>
                {item.imageBase64 ? (
                  <Image
                    style={styles.bodyTableCellImage}
                    src={item.imageBase64}
                  />
                ) : null}
              </View>

              <View style={styles.bodyTableColName}>
                <Text style={styles.bodyTableCell}>{item["Наименование"]}</Text>
              </View>
              <View style={styles.bodyTableColDescription}>
                <Text style={styles.bodyTableCell}>
                  {item["Описание краткое"]}
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
                  {Number(item.price) * Number(item.count)}
                </Text>
              </View>
            </View>
          ))}

          {/* Итоги */}
          <View
            style={[
              styles.bodyTableRow,
              (countItems + 1) % 2 === 0 ? styles.TableRowColorGrey : {},
            ]}
          >
            <View style={styles.bodyTableColId} />
            <View style={[styles.bodyTableColName, styles.BoldText]}>
              <Text style={styles.bodyTableCell}>Итоги промежуточные</Text>
            </View>
            <View style={styles.bodyTableColDescription}>
              <Text style={styles.bodyTableCell}>Итого за {titleTable}</Text>
            </View>
            <View style={styles.bodyTableColCount} />
            <View style={styles.bodyTableColPrice} />
            <View style={styles.bodyTableColAllPrice}>
              <Text style={styles.bodyTableCell}>{equipPrice}</Text>
            </View>
          </View>

          {/* Скидка */}
          <View
            style={[
              styles.bodyTableRow,
              (countItems + 2) % 2 === 0 ? styles.TableRowColorGrey : {},
            ]}
          >
            <View style={styles.bodyTableColId} />
            <View style={styles.bodyTableColName} />
            <View style={styles.bodyTableColDescription} />
            <View style={styles.bodyTableColCount} />
            <View style={[styles.bodyTableColPrice, styles.BoldText]}>
              <Text style={styles.bodyTableCell}>СКИДКА {discount}%</Text>
            </View>
            <View style={[styles.bodyTableColAllPrice, styles.ItalicBoldText]}>
              <Text style={styles.bodyTableCell}>
                {equipPrice - equipPrice * (Number(discount) / 100)}
              </Text>
            </View>
          </View>

          {/* Услуги */}
          {servicesList.length > 0 && (
            <>
              <View style={styles.headerTableRow}>
                <Text style={styles.TableColTitle}>Услуги специалистов</Text>
              </View>
              {servicesList.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.bodyTableRow,
                    (countItems + index) % 2 === 0
                      ? styles.TableRowColorGrey
                      : {},
                  ]}
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
                    <Text style={styles.bodyTableCell}>{item.description}</Text>
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
              <View style={styles.bodyTableRow}>
                <View style={styles.bodyTableColId} />
                <View
                  style={[
                    styles.bodyTableColName,
                    styles.BoldText,
                    styles.TextRight,
                  ]}
                >
                  <Text style={styles.bodyTableCell}>ОБЩИЙ ИТОГ</Text>
                </View>
                <View style={styles.bodyTableColDescription} />
                <View style={styles.bodyTableColCount} />
                <View style={styles.bodyTableColPrice} />
                <View style={styles.bodyTableColAllPrice}>
                  <Text style={styles.bodyTableCell}>
                    {servicesPrice +
                      (equipPrice - equipPrice * (Number(discount) / 100))}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Условия */}
        {conditions.length > 0 && (
          <View style={styles.ConditionBlock}>
            <Text style={[styles.ConditionBlockTitleText, styles.BoldText]}>
              Условия предоставления услуги.
            </Text>
            {conditions.map((item, index) => (
              <Text key={index} style={styles.ConditionBlockСontentText}>
                - {item.text}
              </Text>
            ))}
          </View>
        )}

        {/* Подпись */}
        <View style={styles.FinishBlock}>
          <View style={styles.FinishBlockLeft}>
            <Text
              style={[
                styles.FinishBlockLeftContentText,
                styles.BorderBottomBlackSmall,
              ]}
            >
              Директор Ткаченко А. Н.
            </Text>
            <Text style={styles.FinishBlockLeftContentText}>
              (Должность) Ф.И.О.
            </Text>
            <Text
              style={[
                styles.FinishBlockLeftContentText,
                styles.BorderBottomBlackSmall,
              ]}
            >
              {dateSign}
            </Text>
            <Text style={styles.FinishBlockLeftContentText}>(Дата)</Text>
            <View style={styles.FinishBlockLeftContentSign}>
              <Text>Подпись</Text>
              <Image src={Sign} style={styles.SignImage} />
            </View>
          </View>
          <View style={styles.FinishBlockRight}>
            <Text>М.П.</Text>
            <Image src={Shtamp} style={styles.ShtampImage} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
