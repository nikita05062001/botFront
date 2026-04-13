import React from "react";
import { Page, Text, Image, Document, View, Font } from "@react-pdf/renderer";
import styles from "./PDFstyles";

// Импорт шрифтов
import MyCustomFont from "../../fonts/calibri.ttf";
import MyCustomFontBold from "../../fonts/calibriBold.ttf";

Font.register({ family: "Calibri", src: MyCustomFont });
Font.register({ family: "CalibriBold", src: MyCustomFontBold });

const getDirectDriveUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};

const EquipmentListPDF = ({
  value = {},
  place = "г. Астана",
  date = "",
  titleTable = "Оборудование",
}) => {
  const items = Object.values(value);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.headerTitle, { marginBottom: 10 }]}>
          <Text style={styles.headetText}>СПИСОК ОБОРУДОВАНИЯ</Text>
        </View>

        <View style={[styles.headerContent, { marginLeft: 0, marginTop: 10 }]}>
          <Text>Дата мероприятия: {date}</Text>
          <Text>Место проведения: {place}</Text>
        </View>

        <View style={styles.table}>
          {/* Header Table */}
          <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
            <View style={styles.headerTableColId}>
              <Text>№</Text>
            </View>
            <View style={styles.headerTableColImage}>
              <Text>Фото</Text>
            </View>
            <View style={styles.headerTableColName}>
              <Text>Наименование</Text>
            </View>
            <View style={[styles.headerTableColDescription, { width: "40%" }]}>
              <Text>Описание</Text>
            </View>
            <View style={styles.headerTableColCount}>
              <Text>Кол</Text>
            </View>
          </View>

          {/* Table Body */}
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
                    style={{ width: "100%", height: "auto", maxHeight: 70 }}
                    src={getDirectDriveUrl(item["URL-Изображения"])}
                  />
                ) : (
                  <Text style={styles.bodyTableCell}>—</Text>
                )}
              </View>

              <View style={styles.bodyTableColName}>
                <Text style={styles.bodyTableCell}>{item["Наименование"]}</Text>
              </View>

              <View style={[styles.bodyTableColDescription, { width: "40%" }]}>
                <Text style={styles.bodyTableCell}>
                  {item["Описание краткое"]}
                </Text>
              </View>

              <View style={styles.bodyTableColCount}>
                <Text style={styles.bodyTableCell}>{item.count}</Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{ marginTop: 30, borderTop: "1px solid #EEE", paddingTop: 10 }}
        >
          <Text style={{ fontSize: 9, color: "grey", textAlign: "center" }}>
            Документ сформирован автоматически для внутреннего использования.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default EquipmentListPDF;
