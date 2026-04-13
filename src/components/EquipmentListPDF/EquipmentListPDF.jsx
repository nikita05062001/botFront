import React from "react";
import { Page, Text, Image, Document, View, Font } from "@react-pdf/renderer";
import styles from "./PDFstyles";

const EquipmentListPDF = ({
  value = {},
  place = "г. Астана",
  date = "",
  titleTable = "Оборудование",
}) => {
  const items = Object.values(value);

  const getDirectDriveUrl = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
    }
    return url;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerTitle}>
          <Text style={styles.headetText}>СПИСОК ОБОРУДОВАНИЯ</Text>
        </View>

        <View style={[styles.headerContent, { marginTop: 10 }]}>
          <Text>Место проведения: {place}</Text>
          <Text>Дата мероприятия: {date}</Text>
        </View>

        <View style={styles.table}>
          {/* Шапка таблицы — один в один как в КП */}
          <View style={[styles.headerTableRow, styles.TableRowColorGrey]}>
            <View style={{ width: "5%", textAlign: "center" }}>
              <Text style={styles.headerTableCell}>№</Text>
            </View>
            <View style={{ width: "15%", textAlign: "center" }}>
              <Text style={styles.headerTableCell}>Фото</Text>
            </View>
            <View style={{ width: "40%", textAlign: "left", paddingLeft: 5 }}>
              <Text style={styles.headerTableCell}>Наименование</Text>
            </View>
            <View style={{ width: "30%", textAlign: "left" }}>
              <Text style={styles.headerTableCell}>Описание</Text>
            </View>
            <View style={{ width: "10%", textAlign: "center" }}>
              <Text style={styles.headerTableCell}>Кол</Text>
            </View>
          </View>

          {/* Строки оборудования */}
          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.bodyTableRow,
                index % 2 !== 0 ? styles.TableRowColorGrey : {},
              ]}
              wrap={false}
            >
              <View style={{ width: "5%", textAlign: "center" }}>
                <Text style={styles.bodyTableCell}>{index + 1}</Text>
              </View>

              <View style={{ width: "15%", padding: 2 }}>
                {item["URL-Изображения"] ? (
                  <Image
                    style={{ width: "100%", height: "auto" }}
                    src={getDirectDriveUrl(item["URL-Изображения"])}
                  />
                ) : (
                  <Text style={styles.bodyTableCell}>—</Text>
                )}
              </View>

              <View style={{ width: "40%", paddingLeft: 5 }}>
                <Text style={{ fontSize: 10, fontFamily: "CalibriBold" }}>
                  {item["Наименование"]}
                </Text>
              </View>

              <View style={{ width: "30%", paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 9 }}>{item["Описание краткое"]}</Text>
              </View>

              <View style={{ width: "10%", textAlign: "center" }}>
                <Text style={styles.bodyTableCell}>{item.count}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default EquipmentListPDF;
