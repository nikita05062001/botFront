import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    paddingTop: 30,
    paddingLeft: 40,
    paddingBottom: 30,
    paddingRight: 30,
    fontFamily: "Calibri",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headetText: {
    fontFamily: "CalibriBold",
    fontSize: 18,
  },
  logoImage: {
    width: 120,
    marginRight: 30,
  },
  headerTitle: {
    marginTop: 10,
  },
  headerContent: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  table: {
    marginTop: 20,
    display: "table",
    width: "auto",
  },
  headerTableRow: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
  },
  bodyTableRow: {
    flexDirection: "row",
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 40,
    paddingVertical: 5,
  },
  TableRowColorGrey: {
    backgroundColor: "#F9F9F9",
  },
  TableColTitle: {
    fontSize: 12,
    fontFamily: "CalibriBold",
    marginVertical: 5,
    textAlign: "center",
    width: "100%",
  },
  FinishBlock: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SignImage: { width: 60 },
  ShtampImage: { width: 100 },
});

export default styles;
