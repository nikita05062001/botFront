import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
  View,
} from "@react-pdf/renderer";
import Logo from "../../img/logo.jpg";
import { Font } from "@react-pdf/renderer";
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

const styles = StyleSheet.create({
  body: {
    fontFamily: "Calibri",
  },
  page: {
    backgroundColor: "white",
    color: "black",
    paddingTop: 18,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingRight: 16,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontFamily: "Calibri",
    fontSize: 18,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    justifyContent: "flex-start", // Distribute space between items
  },
  headetText: {
    fontFamily: "CalibriBold",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  logoImage: {
    width: 130,
    marginRight: 50,
  },
  headetTitleText: {
    fontFamily: "Calibri",
    fontSize: 8,
    marginLeft: 23,
    marginTop: -2,
  },
  headerContent: {
    fontFamily: "Calibri",
    fontSize: 12,
    marginLeft: 59,
    marginTop: 22,
  },
  headerContentDate: {
    marginBottom: 8,
  },
  //таблица стили
  table: {
    marginTop: 35,
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    fontFamily: "Calibri",
    fontSize: 11,
  },
  headerTableRow: {
    flexDirection: "row",
  },
  bodyTableRow: {},
  TableRowColorGrey: {
    backgroundColor: "#F5F5F5",
  },
  headerTableColId: {
    width: "5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColId: {
    width: "5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  headerTableColName: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "left",
    marginTop: 18,
  },
  bodyTableColName: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "left",
  },
  headerTableColDescription: {
    width: "40%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 18,
    textAlign: "center",
  },
  bodyTableColDescription: {
    width: "40%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  headerTableColCount: {
    width: "5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "left",
    marginTop: 18,
  },
  bodyTableColCount: {
    width: "5%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "left",
  },
  headerTableColPrice: {
    width: "15%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColPrice: {
    width: "15%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  headerTableColAllPrice: {
    width: "10%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColAllPrice: {
    width: "10%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  headerTableCell: {
    fontSize: 11,
    paddingLeft: 5,
    paddingRight: 5,
  },
  bodyTableCell: {
    fontSize: 11,
    paddingLeft: 5,
    paddingRight: 5,
  },
  TableColTitle: {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    marginBottom: -4,
    padding: 0,
  },
  TableColMiniDescription: {
    textAlign: "center",
    textIndent: 45,
    fontFamily: "CalibriItalic",
  },
});

const PDFFile = ({
  title = "Коммерческое предложение.",
  place = "г. Астана, улитца Кенесеры, дом 2, государственная филармония",
  date = "01.01.2022",
  titleTable = "Backline",
  miniDescription = "Барабанная установка, микрофоны вокальные, микрофоны для подзвучки барабанов, стойки микрофонные, коммутация для подключения инструментов.",
}) => {
  return (
    //закоментировать вьювер когда макет готов будет
    <PDFViewer style={styles.viewer}>
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
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
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFFile;
