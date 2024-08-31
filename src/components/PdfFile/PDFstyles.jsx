import { StyleSheet } from "@react-pdf/renderer";

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
  footer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 12,
    textAlign: "right",
    width: "100%",
    color: "black",
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
    fontFamily: "Calibri",
    fontSize: 11,
  },
  headerTableRow: {
    flexDirection: "row",
  },
  bodyTableRow: {
    flexDirection: "row",
    minHeight: 15,
  },
  TableRowColorGrey: {
    backgroundColor: "#F5F5F5",
  },
  headerTableColId: {
    width: "4.9%",
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColId: {
    width: "4.9%",
    textAlign: "center",
  },
  headerTableColName: {
    width: "25%",
    textAlign: "left",
    marginTop: 18,
    paddingRight: 55,
  },
  bodyTableColName: {
    width: "25%",
    textAlign: "left",
    flexGrow: 1,
    flexWrap: "wrap", // Обеспечивает перенос текста на новую строку
    overflow: "hidden", // Скрывает текст, который не помещается в контейнер
  },
  headerTableColDescription: {
    width: "40%",
    marginTop: 18,
    textAlign: "center",
  },
  bodyTableColDescription: {
    width: "40%",
    flexWrap: "wrap", // Обеспечивает перенос текста на новую строку
    overflow: "hidden", // Скрывает текст, который не помещается в контейнер
  },
  headerTableColCount: {
    width: "5%",
    textAlign: "left",
    marginTop: 18,
  },
  bodyTableColCount: {
    width: "5%",
    textAlign: "left",
  },
  headerTableColPrice: {
    width: "15%",
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColPrice: {
    width: "15%",
    textAlign: "center",
  },
  headerTableColAllPrice: {
    width: "10%",
    textAlign: "center",
    marginTop: 18,
  },
  bodyTableColAllPrice: {
    width: "10%",
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
    paddingTop: 3,
    flexWrap: "wrap", // Обеспечивает перенос текста на новую строку
  },
  TableColTitle: {
    fontSize: 14,
    textAlign: "center",
    margin: "auto",
    marginBottom: -4,
    padding: 0,
  },
  TableColMiniDescription: {
    paddingTop: 5,
    textAlign: "center",
    textIndent: 45,
    fontFamily: "CalibriItalic",
  },
  BoldText: {
    fontFamily: "CalibriBold",
  },
  TextCenter: {
    textAlign: "center",
  },
  ItalicBoldText: {
    fontFamily: "CalibriBoldItalic",
  },
});

export default styles;
