import React from "react";
import { Page, Text, Image, Document, View, Font } from "@react-pdf/renderer";
import Logo from "../../img/logo.jpg";
import Sign from "../../img/podpis.jpg";
import Shtamp from "../../img/shtamp.jpg";
import styles from "./PDFstyles";

// Импорт шрифтов
import MyCustomFont from "../../fonts/calibri.ttf";
import MyCustomFontBold from "../../fonts/calibriBold.ttf";
import MyCustomFontItalic from "../../fonts/calibriItalic.ttf";
import MyCustomFontBoldItalic from "../../fonts/calibriBoldItalic.ttf";

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

// Функция для преобразования ссылок Google Drive в прямые ссылки
const getDirectDriveUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
  }
  return url;
};

const PDFFile = ({
  value = {},
  title = "Коммерческое предложение.",
  place = "г. Астана",
  date = "",
  titleTable = "Оборудование",
  miniDescription = "",
  discount = 0,
  services = {},
  dateSign = "",
  conditions = [],
}) => {
  const items = Object.values(value);

  // Безопасный расчет цен (защита от NaN)
  const equipPrice = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.count) || 0),
    0,
  );

  const servicesArr = Object.values(services);
  const servicesPrice = servicesArr.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.count) || 0),
    0,
  );

  const totalWithDiscount = equipPrice - equipPrice * (Number(discount) / 100);
  const finalTotal = totalWithDiscount + servicesPrice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>{title}</Text>
        </View>

        <View style={styles.headerTitle}>
          <Text style={styles.headetTitleText}>Аренда оборудования</Text>
        </View>

        <View style={styles.headerContent}>
          <Text>Дата проведения мероприятия: {date}</Text>
          <Text>Место проведения мероприятия: {place}</Text>
        </View>

        {/* Таблица */}
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
              <Text style={styles.headerTableCell}>Кол</Text>
            </View>
            <View style={styles.headerTableColPrice}>
              <Text style={styles.headerTableCell}>Цена/шт</Text>
            </View>
            <View style={styles.headerTableColAllPrice}>
              <Text style={styles.headerTableCell}>Сумма</Text>
            </View>
          </View>

          {/* Категория оборудования */}
          <View style={styles.headerTableRow}>
            <Text style={styles.TableColTitle}>{titleTable}</Text>
          </View>
          <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
            <Text style={styles.TableColMiniDescription}>
              Краткое описание: {miniDescription}
            </Text>
          </View>

          {/* Тело таблицы оборудования */}
          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.bodyTableRow,
                index % 2 !== 0 ? styles.TableRowColorGrey : {},
              ]}
              wrap={false}
            >
              <View style={styles.bodyTableColId}>
                <Text style={styles.bodyTableCell}>{index + 1}</Text>
              </View>

              <View style={styles.bodyTableColImage}>
                {item["URL-Изображения"] ? (
                  <Image
                    style={{ width: "100%", height: "auto" }}
                    src={getDirectDriveUrl(item["URL-Изображения"])}
                  />
                ) : (
                  <Text style={styles.bodyTableCell}>—</Text>
                )}
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
                <Text style={styles.bodyTableCell}>{item.price || 0}</Text>
              </View>

              <View style={styles.bodyTableColAllPrice}>
                <Text style={styles.bodyTableCell}>
                  {(Number(item.price) || 0) * (Number(item.count) || 0)}
                </Text>
              </View>
            </View>
          ))}

          {/* Итоги по оборудованию */}
          <View style={styles.bodyTableRow}>
            <View style={styles.bodyTableColId}></View>
            <View style={[styles.bodyTableColName, styles.BoldText]}>
              <Text style={styles.bodyTableCell}>Итоги промежуточные</Text>
            </View>
            <View style={styles.bodyTableColDescription}>
              <Text style={styles.bodyTableCell}>Итого за {titleTable}</Text>
            </View>
            <View style={styles.bodyTableColAllPrice}>
              <Text style={styles.bodyTableCell}>{equipPrice}</Text>
            </View>
          </View>

          {/* Скидка */}
          <View style={[styles.bodyTableRow, styles.TableRowColorGrey]}>
            <View style={styles.bodyTableColId}></View>
            <View style={styles.bodyTableColPrice}>
              <Text style={[styles.bodyTableCell, styles.BoldText]}>
                СКИДКА {discount}%
              </Text>
            </View>
            <View style={styles.bodyTableColAllPrice}>
              <Text style={[styles.bodyTableCell, styles.ItalicBoldText]}>
                {totalWithDiscount}
              </Text>
            </View>
          </View>

          {/* Услуги */}
          {servicesArr.length > 0 && (
            <>
              <View style={styles.headerTableRow}>
                <Text style={styles.TableColTitle}>Услуги специалистов</Text>
              </View>
              {servicesArr.map((item, idx) => (
                <View key={idx} style={styles.bodyTableRow}>
                  <View style={styles.bodyTableColId}>
                    <Text style={styles.bodyTableCell}>
                      {items.length + idx + 1}
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
                  <View style={styles.bodyTableColAllPrice}>
                    <Text style={styles.bodyTableCell}>
                      {item.count * item.price}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Финальный Итог */}
          <View style={styles.bodyTableRow}>
            <View style={styles.bodyTableColName}>
              <Text style={[styles.bodyTableCell, styles.BoldText]}>
                ИТОГО К ОПЛАТЕ
              </Text>
            </View>
            <View style={styles.bodyTableColAllPrice}>
              <Text style={styles.bodyTableCell}>{finalTotal}</Text>
            </View>
          </View>
        </View>

        {/* Подпись и штамп */}
        <View style={styles.FinishBlock}>
          <View style={styles.FinishBlockLeft}>
            <Text style={styles.BorderBottomBlackSmall}>
              Директор Ткаченко А. Н.
            </Text>
            <Text>{dateSign}</Text>
            <View style={styles.FinishBlockLeftContentSign}>
              <Text>Подпись:</Text>
              <Image src={Sign} style={styles.SignImage} />
            </View>
          </View>
          <View style={styles.FinishBlockRight}>
            <Image src={Shtamp} style={styles.ShtampImage} />
            <Text style={{ textAlign: "center", fontSize: 8 }}>М.П.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
